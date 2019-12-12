using AppCore.Controllers.commons;
using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class MenuLogic : IMenuLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<MenuLogic> Logger { get; }

        public MenuLogic(
            IUnitOfWork uow,
            ILogger<MenuLogic> logger
        )
        {
            _uow = uow;
            Logger = logger;
        }

        /*
         * Create new Menu
         */
        public async Task<CreatedMenuVM> CreateMenuAsync(ReqCreateMenu reqData)
        {
            try
            {
                CreatedMenuVM createdMenuVM = new CreatedMenuVM();
                // Created Menu
                Logger.LogInformation("Create new menu");
                string SlugName = StringHelper.GenerateSlug(reqData.Name);
                reqData.Slug = SlugName;
                reqData.ParentId = reqData.ParentId ?? Guid.Empty;

                Menu menuData = new Menu
                {
                    Name = reqData.Name,
                    ParentId = reqData.ParentId,
                    Slug = reqData.Slug
                };
                Task<bool> menuCreated = _uow.GetRepository<Menu>().AddAsync(menuData);

                _uow.SaveChanges();
                await Task.WhenAll(menuCreated);

                createdMenuVM.menuData = menuData;
                return await Task.FromResult(createdMenuVM);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Update Menu
         */
        public async Task<Menu> UpdateMenuAsync(UpdateMenuReq menuData)
        {
            try
            {
                // Update menu
                Logger.LogInformation("Update menu");
                Menu menu = _uow.GetRepository<Menu>().Get(menuData.Id);
                menu.Name = menuData.Name;
                menu.ParentId = menuData.ParentId ?? Guid.Empty;

                string SlugName = StringHelper.GenerateSlug(menuData.Name);
                if (!string.IsNullOrEmpty(menuData.Slug))
                {
                    SlugName = StringHelper.GenerateSlug(menuData.Slug);
                }
                menu.Slug = SlugName;

                _uow.GetRepository<Menu>().Update(menu);

                _uow.SaveChanges();
                return await Task.FromResult(menu);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all menu
         */
        public List<Menu> GetAllMenuAsync()
        {
            try
            {
                return _uow.GetRepository<Menu>().GetAll();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all menu with edit data
         */
        public async Task<MenuWithEditVM> GetCategoriesWithEditAsync(Guid id)
        {
            MenuWithEditVM menuWithEditVM = new MenuWithEditVM();
            try
            {
                menuWithEditVM.MenuList = _uow.GetRepository<Menu>().GetAll();
                menuWithEditVM.Menu = _uow.GetRepository<Menu>().Get(id);
                return await Task.FromResult(menuWithEditVM);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all menu
         */
        public async Task<Menu> GetMenuAsync(Guid id)
        {
            try
            {
                var result = _uow.GetRepository<Menu>().Get(id);
                return await Task.FromResult(result);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
        // * Delete menu
        // */
        public async Task<Menu> DeleteMenuAsync(ReqDeleteMenu reqDelete)
        {
            try
            {
                var menu = new Menu
                {
                    Id = reqDelete.Id
                };
                _uow.GetRepository<Menu>().Delete(reqDelete.Id);
                _uow.SaveChanges();
                return await Task.FromResult(menu);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
