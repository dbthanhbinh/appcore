using AppCore.Business;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : BaseController
    {
        private readonly IRoleLogic _roleLogic;

        public RoleController(IRoleLogic roleLogic)
        {
            _roleLogic = roleLogic;
        }

        /**
         * Get list all from data base
         */
        [HttpGet("getRoles", Name = "GetRoles")]
        public ActionResult GetRoles()
        {
            try
            {
                //var result = _roleLogic.GetRolesAsync();
                //return Ok(new BaseResponse(result));
                return null;
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
            
        }

        [HttpPost("createRole", Name = "CreateRole")]
        public async Task<ActionResult> CreateRoleAsync([FromBody] CreateRoleReq createRoleReq)
        {
            try
            {
                //var result = await _roleLogic.CreateRoleAsync(category);
                //return Ok(new BaseResponse(result));
                return null;
            }
            catch (Exception ex)
            {
                return Ok(this.BaseResponseApiErrorResult(ex));
            }
        }
    }
}
