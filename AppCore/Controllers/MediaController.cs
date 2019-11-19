using System.Threading.Tasks;
using AppCore.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FileService;
using AppCore.Controllers.commons;
using System.Collections;

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
            var result = _mediaLogic.CreateMediaAsync(file);
            return Ok(new BaseResponse(result));
        }

        /*
         * Get all media
         */
        [HttpGet("getAllMedia", Name = "GetAllMedia")]
        public ActionResult GetAll()
        {
            // My test open excel
            object a = _mediaLogic.GetAll();
            return Ok(new BaseResponse(a));
        }
    }
}