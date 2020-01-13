using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers.ClientControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        [HttpGet("getTest", Name = "getTest")]
        public ActionResult GetTest()
        {
            return Ok();
        }
    }
}