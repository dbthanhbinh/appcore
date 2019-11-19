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
    public class SimCardController : BaseController
    {
        private readonly ISimCardLogic _simCardLogic;
        public SimCardController(ISimCardLogic simCardLogic) {
            _simCardLogic = simCardLogic;
        }

        /*
         * Import sim card
         */
        [HttpGet("importFromExcelFile", Name = "ImportFromExcelFile")]
        public ActionResult ImportFromExcelFile()
        {
            _simCardLogic.ReadExcelFile();
            return Ok(new BaseResponse());
        }

        /*
         * Get all SimCard
         */
        [HttpGet("getAll", Name = "GetAllSimCard")]
        public ActionResult GetAllSimCard()
        {
            object a = _simCardLogic.GetAll();
            return Ok(new BaseResponse(a));
        }
    }
}