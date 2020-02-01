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
    public class BaseController : ControllerBase
    {
        protected Guid UserId
        {
            get
            {
                var userData = HttpContext.User.Claims;
                var claimData = userData.Where(c => c.Type == ClaimTypes.Name).SingleOrDefault();
                if (claimData != null)
                    return new Guid(claimData.Value);
                else
                    return new Guid();
            }
        }

        protected string UserRole
        {
            get
            {
                var userData = HttpContext.User.Claims;
                var claimData = userData.Where(c => c.Type == ClaimTypes.Role).SingleOrDefault();
                if (claimData != null)
                    return claimData.Value;
                else
                    return null;
            }
        }

        protected string UserPhone
        {
            get
            {
                var userData = HttpContext.User.Claims;
                var claimData = userData.Where(c => c.Type == "Phone").SingleOrDefault();
                if (claimData != null)
                    return claimData.Value;
                else
                    return null;
            }
        }

        protected string UserEmail
        {
            get
            {
                var userData = HttpContext.User.Claims;
                var claimData = userData.Where(c => c.Type == ClaimTypes.Email).SingleOrDefault();
                if (claimData != null)
                    return claimData.Value;
                else
                    return null;
            }
        }

        public BaseResponse BaseResponseApiErrorResult(Exception ex)
        {
            return new BaseResponse(ex.InnerException.Message.ToString());
        }
    }
}