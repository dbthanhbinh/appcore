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
    public class MenuController : BaseController
    {
        private readonly IMenuLogic _menuLogic;

        public MenuController(IMenuLogic menuLogic)
        {
            _menuLogic = menuLogic;
        }

        /**
         * Create new Menu
         * Params: payload = { "Name": "Text name" }
         */
        [HttpPost("createMenu", Name = "CreateMenu")]
        public async Task<ActionResult> CreateMenuAsync([FromBody] ReqCreateMenu menu)
        {
            var result = await _menuLogic.CreateMenuAsync(menu);
            return Ok(new BaseResponse(result));
        }

        /**
         * Update Menu
         * Params: payload = { "Name": "Text name" }
         */
        [HttpPost("updateMenu", Name = "UpdateMenu")]
        public async Task<ActionResult> UpdateMenuAsync([FromBody] UpdateMenuReq menu)
        {
            var result = await _menuLogic.UpdateMenuAsync(menu);
            return Ok(new BaseResponse(result));
        }

        /**
         * Get list all menu from data base
         */
        [HttpGet("getAllMenu", Name = "GetAllMenu")]
        public ActionResult GetAllMenu()
        {
            var result = _menuLogic.GetAllMenuAsync();
            return Ok(new BaseResponse(result));
        }

        /**
         * Get Detail menu by id
         */
        [HttpGet("getMenu/{id}", Name = "GetMenu")]
        public async Task<ActionResult> GetMenu(Guid id)
        {
            var result = await _menuLogic.GetMenuAsync(id);
            return Ok(new BaseResponse(result));
        }

        /*
         * Delete Menu
         */
        [HttpDelete("deleteMenu", Name = "DeleteMenuAsync")]
        public async Task<ActionResult> DeleteMenuAsync(ReqDeleteMenu reqDelete)
        {
            var result = await _menuLogic.DeleteMenuAsync(reqDelete);
            return Ok(new BaseResponse(result));
        }

        /**
         * 
         */
        [HttpGet("getCategoriesWithEdit/{id}", Name = "GetCategoriesWithEdit")]
        public ActionResult GetCategoriesWithEdit(Guid id)
        {
            var result = _menuLogic.GetCategoriesWithEditAsync(id);
            return Ok(new BaseResponse(result));
        }
    }
}