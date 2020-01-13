using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : BaseController
    {
        private readonly ITagLogic _tagLogic;
        public TagController(ITagLogic tagLogic)
        {
            var ctx = HttpContext;
            _tagLogic = tagLogic;
        }

        [HttpGet("getAllTag", Name = "GetAllTag")]
        public ActionResult GetAllTag()
        {
            object a = _tagLogic.GetAll();
            return Ok(new BaseResponse(a));
        }

        [HttpPost("createTag", Name = "CreateTagAsync")]
        public async Task<ActionResult> CreateTagAsync([FromBody] ReqCreateTag tag)
        {
            var result = await _tagLogic.CreateTagAsync(tag);
            return Ok(new BaseResponse(result));
        }

        /**
         * Update tag
         * Params: payload = { "Name": "Text name", "Slug": "Slug name" }
         */
        [HttpPost("updateTag", Name = "UpdateTag")]
        public async Task<ActionResult> UpdateTagAsync([FromBody] UpdateTagReq tag)
        {
            var result = await _tagLogic.UpdateTagAsync(tag);
            return Ok(new BaseResponse(result));
        }

        /*
         * Delete Category
         */
        [HttpDelete("deleteTag", Name = "DeleteTagAsync")]
        public async Task<ActionResult> DeleteTagAsync(ReqDeleteTag reqDelete)
        {
            var result = await _tagLogic.DeleteTagAsync(reqDelete);
            return Ok(new BaseResponse(result));
        }

        /**
         * 
         */
        [HttpGet("getTagWithEdit/{id}", Name = "GetTagWithEdit")]
        public ActionResult GetTagWithEdit(Guid id)
        {
            var result = _tagLogic.GetTagWithEditAsync(id);
            return Ok(new BaseResponse(result));
        }
    }
}