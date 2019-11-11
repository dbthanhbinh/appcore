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
         * Create new Category
         * Params: payload = { "Name": "Text name" }
         */
        [HttpPost("createCategory", Name = "CreateCategory")]
        public async Task<ActionResult> CreateCategoryAsync([FromBody] ReqCreateCategory category)
        {
            var result = await _categoryLogic.CreateCategoryAsync(category);
            return Ok(new BaseResponse(result));
        }

        /**
         * Update Category
         * Params: payload = { "Name": "Text name" }
         */
        [HttpPost("updateCategory", Name = "UpdateCategory")]
        public async Task<ActionResult> UpdateCategoryAsync([FromBody] UpdateCategoryReq category)
        {
            var result = await _categoryLogic.UpdateCategoryAsync(category);
            return Ok(new BaseResponse(result));
        }

        /**
         * Get list all category from data base
         */
        [HttpGet("getAllCategory", Name = "GetAllCategory")]
        public ActionResult GetAllCategory()
        {
            var result = _categoryLogic.GetAllCategoryAsync();
            return Ok(new BaseResponse(result));
        }

        /**
         * Get Detail category by id
         */
        [HttpGet("getCategory/{id}", Name = "GetCategory")]
        public async Task<ActionResult> GetCategory(Guid id)
        {
            var result = await _categoryLogic.GetCategoryAsync(id);
            return Ok(new BaseResponse(result));
        }

        /*
         * Delete Category
         */
        [HttpDelete("deleteCategory", Name = "DeleteCategoryAsync")]
        public async Task<ActionResult> DeleteCategoryAsync(ReqDeleteCategory reqDelete)
        {
            var result = await _categoryLogic.DeleteCategoryAsync(reqDelete);
            return Ok(new BaseResponse(result));
        }

        /**
         * 
         */
        [HttpGet("getCategoriesWithEdit/{id}", Name = "GetCategoriesWithEdit")]
        public ActionResult GetCategoriesWithEdit(Guid id)
        {
            var result = _categoryLogic.GetCategoriesWithEditAsync(id);
            return Ok(new BaseResponse(result));
        }
    }
}