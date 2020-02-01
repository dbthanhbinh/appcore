using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers.ClientControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestController : BaseController
    {
        private readonly ISettingLogic _settingLogic;
        public RestController(ISettingLogic settingLogic)
        {
            _settingLogic = settingLogic;
        }

        [HttpGet("getTest", Name = "getTest")]
        public ActionResult GetTest()
        {
            return Ok();
        }

        // Get layout settings
        [HttpGet("getLayoutSettings", Name = "GetLayoutSettings")]
        public ActionResult GetLayoutSettings()
        {
            var result = _settingLogic.GetLayoutSettingsAsync();
            return Ok(new BaseResponse(result));
        }
    }
}