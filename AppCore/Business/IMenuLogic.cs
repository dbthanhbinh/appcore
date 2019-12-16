using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IMenuLogic
    {
        Task<CreatedMenuVM> CreateMenuAsync(ReqCreateMenu menu);
        Task<Menu> UpdateMenuAsync(UpdateMenuReq category);
        List<Menu> GetAllMenuAsync();
        Task<Menu> GetMenuAsync(Guid id);
        Task<Menu> DeleteMenuAsync(ReqDeleteMenu reqDeleteMenu);
        Task<MenuWithEditVM> GetMenuWithEditAsync(Guid id);
    }
}
