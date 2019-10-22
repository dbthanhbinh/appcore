using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface ICategoryLogic
    {
        Task<Category> CreateCategoryAsync(Category category);
        List<Category> GetAllCategoryAsync();
        //void DeleteCategoryAsync(ReqDeleteCategory reqDeleteCategory);
    }
}
