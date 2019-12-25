using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Business.Commons;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private readonly ISettingLogic _settingLogic;
        public SettingController(ISettingLogic settingLogic)
        {
            _settingLogic = settingLogic;
        }

        [HttpGet("getGeneralSetting/{settingName}", Name = "GetGeneralSetting")]
        public async Task<ActionResult> GetGeneralSetting(string settingName)
        {
            var result = await _settingLogic.GetSetingOptionAsync(settingName);
            return Ok(new BaseResponse(result));
        }

        [HttpPost("updateGeneralSetingSeo", Name = "UpdateGeneralSetingSeo")]
        public async Task<ActionResult> UpdateGeneralSetingSeo([FromBody] GeneralSettingRequests generalSettingRequests)
        {
            SettingRequests settingRequests = new SettingRequests(generalSettingRequests);
            settingRequests.Name = GeneralSetting.SeoSettingName;
            settingRequests.Type = GeneralSetting.SettingType;
            
            var result = await _settingLogic.UpdateSetingOptionAsync(settingRequests);
            return Ok(new BaseResponse(result));
        }

        [HttpPost("updateGeneralSeting", Name = "UpdateGeneralSeting")]
        public async Task<ActionResult> UpdateGeneralSeting([FromBody] GeneralSettingRequests generalSettingRequests)
        {
            SettingRequests settingRequests = new SettingRequests(generalSettingRequests);
            settingRequests.Name = GeneralSetting.GeneralettingName;
            settingRequests.Type = GeneralSetting.SettingType;

            var result = await _settingLogic.UpdateSetingOptionAsync(settingRequests);
            return Ok(new BaseResponse(result));
        }
    }
}