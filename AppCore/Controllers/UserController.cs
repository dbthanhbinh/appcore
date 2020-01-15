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
            try
            {
                var result = await _userLogic.CreateUserAsync(createUserReq);
                return Ok(new BaseResponse(result));
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }
        
        [HttpGet("getUsers/{pageSize}/{currentPage}", Name = "GetUsers")]
        public ActionResult GetUsersWithPagingAsync(Int32 pageSize, Int32 currentPage)
        {
            try
            {
                GetUsersReq getUsersReq = new GetUsersReq
                {
                    PageSize = pageSize,
                    CurrentPage = currentPage
                };
                var result = _userLogic.GetUsersWithPagingAsync(getUsersReq);
                return Ok(new BaseResponse(result.Result.Data, result.Result.Paging));
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }

        [HttpGet("userProfile/{userId}", Name = "UserProfile")]
        public IActionResult UserProfile(Guid userId)
        {
            try
            {
                UserMemberValid userMemberValid = _userLogic.CheckValidProfileAttibutes(userId);
                if(userMemberValid.IsValid == false)
                {
                    return Ok(new BaseResponse(userMemberValid));
                }
                var users = _userLogic.GetUserById(userId);
                return Ok(users);
            }
            catch(Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }

        [HttpGet("logoutUser", Name = "LogoutUser")]
        public ActionResult LogoutUser()
        {
            try
            {
                _userLogic.LogOutAsyn();
                return Ok();
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }

        [AllowAnonymous]
        [HttpPost("registerMember", Name = "RegisterMember")]
        public async Task<ActionResult> RegisterMember([FromBody] RegisterMemberReq registerMemberReq)
        {
            try
            {
                UserMemberValid userMemberValid = _userLogic.CheckValidRegisterAttibutes(registerMemberReq);
                if (userMemberValid.IsValid == false)
                {
                    return Ok(new BaseResponse(userMemberValid));
                }

                var result = await _userLogic.RegisterMemberAsync(registerMemberReq);
                return Ok(new BaseResponse(result));
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]LoginReq loginReq)
        {
            try
            {
                var user = _userLogic.Authenticate(loginReq);

                if (user == null)
                    return BadRequest(new { message = "Username or password is incorrect" });

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }

    }
}