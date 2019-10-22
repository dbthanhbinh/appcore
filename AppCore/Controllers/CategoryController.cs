using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        private readonly ICategoryLogic _categoryLogic;

        public CategoryController(ICategoryLogic categoryLogic)
        {
            _categoryLogic = categoryLogic;
        }

        /**
         * Params: payload = { "Name": "Text name" }
         */
        [HttpPost("createCategory", Name = "CreateCategory")]
        public async Task<ActionResult> CreateCategoryAsync([FromBody] Category category)
        {
            var result = await _categoryLogic.CreateCategoryAsync(category);
            return Ok(new BaseResponse(result));
        }

        [HttpGet("getAllCategory", Name = "GetAllCategory")]
        public ActionResult GetAllCategory()
        {
            var result = _categoryLogic.GetAllCategoryAsync();
            return Ok(new BaseResponse(result));
        }
    }
}