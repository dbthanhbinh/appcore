using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : BaseController
    {
        private readonly ITagLogic _tagLogic;
        public TagController(ITagLogic tagLogic)
        {
            _tagLogic = tagLogic;
        }

        [HttpGet("getAllTag", Name = "GetAllTag")]
        public ActionResult GetAllTag()
        {
            object a = _tagLogic.GetAll();
            return Ok(new BaseResponse(a));
        }

        [HttpPost("createTag", Name = "CreateTag")]
        public async Task<ActionResult> CreateTagAsync([FromBody] ReqCreateTag tag)
        {
            var result = await _tagLogic.CreateTagAsync(tag);
            return Ok(new BaseResponse(result));
        }
    }
}