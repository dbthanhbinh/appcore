using AppCore.Controllers.commons;
using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class UserLogic : IUserLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<UserLogic> _logger { get; }

        private readonly AppSettings _appSettings;

        public UserLogic(IUnitOfWork uow, ILogger<UserLogic> logger, IOptions<AppSettings> appSettings)
        {
            _uow = uow;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        public UserMemberValid CheckValidRegisterAttibutes(RegisterMemberReq registerMemberReq)
        {
            UserMemberValid registerMemberValid = new UserMemberValid
            {
                IsValid = false,
                Messages = null
            };
            List<string> Messages = new List<string>();
            if (string.IsNullOrEmpty(registerMemberReq.FullName))
            {
                Messages.Add(UserValidMessages.FULL_NAME_NOT_NULL);
            }
            if (string.IsNullOrEmpty(registerMemberReq.Email))
            {
                Messages.Add(UserValidMessages.EMAIL_NOT_NULL);
            }
            if (string.IsNullOrEmpty(registerMemberReq.Phone))
            {
                Messages.Add(UserValidMessages.PHONE_NOT_NULL);
            }
            if (string.IsNullOrEmpty(registerMemberReq.Password))
            {
                Messages.Add(UserValidMessages.PASSWORD_NOT_NULL);
            }
            if (string.IsNullOrEmpty(registerMemberReq.RePassword))
            {
                Messages.Add(UserValidMessages.REPASSWORD_NOT_NULL);
            }
            if (!string.IsNullOrEmpty(registerMemberReq.RePassword) && !string.IsNullOrEmpty(registerMemberReq.Password) && !registerMemberReq.Password.Equals(registerMemberReq.RePassword))
            {
                Messages.Add(UserValidMessages.PASSWORD_DOES_NOT_MATCH);
            }

            if (Messages.Count() > 0)
            {
                registerMemberValid.Messages = Messages;
            }
            else
            {
                registerMemberValid.IsValid = true;
            }
            return registerMemberValid;
        }

        public UserMemberValid CheckValidProfileAttibutes(Guid UserId)
        {
            UserMemberValid registerMemberValid = new UserMemberValid
            {
                IsValid = false,
                Messages = null
            };
            List<string> Messages = new List<string>();
            if (UserId == null)
            {
                Messages.Add(UserValidMessages.USER_ID_NOT_NULL);
            }
            if (Messages.Count() > 0)
            {
                registerMemberValid.Messages = Messages;
            }
            else
            {
                registerMemberValid.IsValid = true;
            }
            return registerMemberValid;
        }

        public async Task<User> RegisterMemberAsync(RegisterMemberReq registerMemberReq)
        {
            try
            {
                User userData = new User
                {
                    FullName = registerMemberReq.FullName,
                    Phone = registerMemberReq.Phone,
                    Email = registerMemberReq.Email,
                    Password = UserHelper.Hash(registerMemberReq.Password)
                };
                Task<bool> userCreate = _uow.GetRepository<User>().AddAsync(userData);
                _uow.SaveChanges();
                await Task.WhenAll(userCreate);
                return userData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }

        public async Task<User> CreateUserAsync(User user)
        {
            try
            {
                string hashed_password = UserHelper.Hash(user.Password);
                user.Password = hashed_password;
                Task<bool> userCreate = _uow.GetRepository<User>().AddAsync(user);
                await Task.WhenAll(userCreate);
                return user;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }
        
        public User Authenticate(LoginReq loginReq)
        {
            try
            {
                string hashed_password = UserHelper.Hash(loginReq.Password);
                //var user = _uow.GetRepository<User>()
                //    .GetByFilter(u => u.Phone == loginReq.Phone && UserHelper.Verify(u.Password, hashed_password))
                //    .FirstOrDefault();

                var user = _uow.GetRepository<User>()
                    .GetByFilter(u => u.Phone == loginReq.Phone && (UserHelper.Verify(loginReq.Password, u.Password) == true))
                    .FirstOrDefault();

                // UserHelper.Verify(loginReq.Password, hashed_password)
                // return null if user not found
                if (user == null)
                    return null;

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email.ToString()),
                        new Claim(ClaimTypes.Role, "SupperAdmin"),
                        new Claim("Phone", user.Phone.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                // remove password before returning
                user.Password = null;
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }

        public void LogOutAsyn()
        {
            try
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]{}),
                    Expires = DateTime.UtcNow.AddDays(7)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }

        public async Task<PagingResponse> GetUsersWithPagingAsync(GetUsersReq getUsersReq)
        {
            try
            {
                int currentPage = getUsersReq.CurrentPage;
                int pageSize = getUsersReq.PageSize;

                List<UserDetailVM> result = null;
                result = _uow.GetRepository<User>().GetAll()
                    .Select(u => new UserDetailVM {
                        FullName = u.FullName,
                        Email = u.Email,
                        Phone = u.Phone
                    }).ToList();




                var resultPg = PagingHelper<UserDetailVM>.GetPagingList(result, currentPage, pageSize);
                await Task.FromResult(resultPg);
                return resultPg;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }

        public Task<UserDetailVM> GetUserById(Guid userId)
        {
            try
            {
                UserDetailVM userData = new UserDetailVM();
                userData = _uow.GetRepository<User>()
                    .GetByFilter(u => u.Id == userId)
                    .Select(user => new UserDetailVM {
                        FullName = user.FullName,
                        Email = user.Email,
                        Phone = user.Phone
                    }).FirstOrDefault();

                return Task.FromResult(userData);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }
    }
}
