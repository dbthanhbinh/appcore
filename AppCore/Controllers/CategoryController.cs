using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
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
            Guid userId = UserId;
            var result = await _categoryLogic.CreateCategoryAsync(userId, category);
            return Ok(new BaseResponse(result));
        }

        /**
         * Update Category
         * Params: payload = { "Name": "Text name" }
         */
        [HttpPost("updateCategory", Name = "UpdateCategory")]
        public async Task<ActionResult> UpdateCategoryAsync([FromBody] UpdateCategoryReq category)
        {
            Guid userId = UserId;
            var result = await _categoryLogic.UpdateCategoryAsync(userId, category);
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
         * Get FilterCategoryWithPagingAsync list all category from data base
         */
        [HttpGet("filterCategoryWithPaging/{pageSize}/{currentPage}", Name = "FilterCategoryWithPagingAsync")]
        public ActionResult FilterCategoryWithPagingAsync(Int32 pageSize, Int32 currentPage)
        {
            ReqFilterCategory reqFilterCategory = new ReqFilterCategory
            {
                PageSize = pageSize,
                CurrentPage = currentPage
            };
            var result = _categoryLogic.FilterCategoryWithPagingAsync(reqFilterCategory);
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
        public ActionResult DeleteCategoryAsync(ReqDeleteCategory reqDelete)
        {
            var result = _categoryLogic.DeleteCategoryAsync(reqDelete);
            return Ok(new BaseResponse() {
                ApiResult = result.ApiResult,
                Message = result.Message.ToString(),
                Data = result.Data
            });
        }

        /**
         * 
         */
        [HttpGet("getCategoriesWithEdit/{id}", Name = "GetCategoriesWithEdit")]
        public ActionResult GetCategoriesWithEdit(Guid id)
        {
            CategoryWithEditVM result = _categoryLogic.GetCategoriesWithEditAsync(id);
            ReqFilterCategory reqFilterCategory = new ReqFilterCategory
            {
                PageSize = 5,
                CurrentPage = 1
            };
            var result2 = _categoryLogic.FilterCategoryWithPagingAsync(reqFilterCategory);
            result.CategoryList = result2.Result;
            return Ok(new BaseResponse(result));
        }
    }
}