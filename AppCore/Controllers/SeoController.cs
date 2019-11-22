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
    public class SeoController : BaseController
    {
        private readonly ISeoLogic _seoLogic;
        public SeoController(ISeoLogic seoLogic)
        {
            _seoLogic = seoLogic;
        }

        /**
         * Get Detail seo by slug
         */
        [HttpGet("getSeoBySlug/{slug}", Name = "GetSeoBySlug")]
        public async Task<ActionResult> GetSeoBySlug(string slug)
        {
            var result = await _seoLogic.GetSeoBySlug(slug);
            return Ok(new BaseResponse(result));
        }
    }
}