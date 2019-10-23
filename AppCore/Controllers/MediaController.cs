using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FileService;

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
    }
}