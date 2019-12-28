using System;
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

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userLogic.GetAll();
            return Ok(users);
        }

        [HttpGet("userProfile/{userId}", Name = "UserProfile")]
        public IActionResult UserProfile()
        {
            var users = _userLogic.GetAll();
            return Ok(users);
        }

        [AllowAnonymous]
        [HttpPost("registerMember", Name = "RegisterMember")]
        public async Task<ActionResult> RegisterMember([FromBody] RegisterMemberReq registerMemberReq)
        {
            try
            {
                RegisterMemberValid registerMemberValid = _userLogic.CheckValidAttibutes(registerMemberReq);
                if (registerMemberValid.IsValid == false)
                {
                    return Ok(new BaseResponse(registerMemberValid));
                }

                var result = await _userLogic.RegisterMemberAsync(registerMemberReq);
                return Ok(new BaseResponse(result));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(null, ex.Message.ToString()));
            }
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

    }
}