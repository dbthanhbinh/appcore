using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers.commons
{
    [Authorize]
    public class BaseController : ControllerBase
    {
        protected Guid UserId
        {
            get
            {
                var ctx = HttpContext;
                var userData = HttpContext.User.Claims;
                var name_u = userData.Where(c => c.Type == ClaimTypes.Name).SingleOrDefault();
                if (name_u != null)
                    return new Guid(name_u.Value);
                else
                    return new Guid();
            }
        }

        public BaseController()
        {
            
        }
        public BaseResponse BaseResponseApiErrorResult(Exception ex)
        {
            return new BaseResponse(ex.InnerException.Message.ToString());
        }
    }
}