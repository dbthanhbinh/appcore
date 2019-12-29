using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers.commons
{
    public class BaseController : ControllerBase
    {
        public BaseResponse BaseResponseApiErrorResult(Exception ex)
        {
            return new BaseResponse(ex.InnerException.Message.ToString());
        }
    }
}