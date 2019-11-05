using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        public readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }
        
        [HttpPost("loginUser", Name = "LoginUser")]
        public async Task<ActionResult> LoginUser([FromBody] User createUserReq)
        {
            var result = await _userLogic.CreateUserAsync(createUserReq);
            return Ok(new BaseResponse(result));
        }

        [AllowAnonymous]
        [HttpPost("createUser", Name = "CreateUser")]
        public async Task<ActionResult> CreateUser([FromBody] CreateUserReq createUserReq)
        {
            User userData = new User
            {
                FullName = createUserReq.FullName,
                Phone = createUserReq.Phone,
                Email = createUserReq.Email,
                Password = createUserReq.Password
            };

            var result = await _userLogic.CreateUserAsync(userData);
            return Ok(new BaseResponse(result));
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]LoginReq loginReq)
        {
            var user = _userLogic.Authenticate(loginReq.Phone);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userLogic.GetAll();
            return Ok(users);
        }
    }
}