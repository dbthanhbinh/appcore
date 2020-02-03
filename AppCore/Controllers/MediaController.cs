using System.Threading.Tasks;
using AppCore.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FileService;
using AppCore.Controllers.commons;
using System.Collections;
using System;

namespace AppCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : BaseController
    {
        private readonly IMediaLogic _mediaLogic;
        public MediaController(IMediaLogic mediaLogic)
        {
            _mediaLogic = mediaLogic;
        }

        [HttpPost("uploadFile", Name = "UploadFile")]
        public ActionResult UploadFile(IFormFile file)
        {
            var result = _mediaLogic.UploadFile(file);
            return Ok(new BaseResponse(result));
        }

        [HttpGet("getConfigs", Name = "GetConfigs")]
        public ActionResult GetConfigs()
        {
            FileLogic fileLogic = new FileLogic();
            var a = fileLogic.GetImageMime();
            return Ok(new BaseResponse(a));
        }

        [HttpPost("createMedia", Name = "CreateMedia")]
        public ActionResult CreateMedia(IFormFile file)
        {
            Guid userId = this.UserId;
            var result = _mediaLogic.CreateMediaAsync(userId, file);
            return Ok(new BaseResponse(result));
        }

        /*
         * Get all media
         */
        [HttpGet("getAllMedia", Name = "GetAllMedia")]
        public async Task<ActionResult> GetAllMedia()
        {
            // My test open excel
            PagingResponse result = null;
            result = await _mediaLogic.GetAllMedia();
            return Ok(new BaseResponse(result.Data, result.Paging));
        }
    }
}