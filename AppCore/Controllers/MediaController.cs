using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("create", Name = "CreateMedia")]
        public async Task<ActionResult> CreateMedia(IFormFile file)
        {
            return Ok();
        }
    }
}