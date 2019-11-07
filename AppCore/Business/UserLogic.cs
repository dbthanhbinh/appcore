using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
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
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private readonly List<User> _users = new List<User>
        {
            new User { Id = new Guid(), FullName = "Test Full name", Phone = "0909874825", Email = "leotrinh86@gmail.com"}
        };

        public UserLogic(IUnitOfWork uow, ILogger<UserLogic> logger, IOptions<AppSettings> appSettings)
        {
            _uow = uow;
            _logger = logger;
            _appSettings = appSettings.Value;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            try
            {
                Task<bool> userCreate = _uow.GetRepository<User>().AddAsync(user);
                await Task.WhenAll(userCreate);
                return user;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
        
        public User Authenticate(string phone)
        {
            var user = _users.SingleOrDefault(x => x.Phone == phone);

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
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            // user.Password = null;

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            // return users without passwords
            return _users.Select(x => {
                return x;
            });
        }

    }
}
