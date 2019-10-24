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
    public class MediaController : ControllerBase
    {
        private readonly IMediaLogic _mediaLogic;
        public MediaController(IMediaLogic mediaLogic)
        {
            _mediaLogic = mediaLogic;
        }

        [HttpPost("uploadFile", Name = "UploadFile")]
        public async Task<ActionResult> UploadFile(IFormFile file)
        {
            FileLogic fileLogic = new FileLogic();
            await fileLogic.UploadFile(file);
            return Ok();
        }

        [HttpGet("getConfigs", Name = "GetConfigs")]
        public ActionResult GetConfigs()
        {
            FileLogic fileLogic = new FileLogic();
            var a = fileLogic.GetImageMime();
            return Ok(new BaseResponse(a));
        }
    }
}