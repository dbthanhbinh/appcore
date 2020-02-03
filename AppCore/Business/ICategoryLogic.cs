using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface ICategoryLogic
    {
        Task<CreatedCategoryVM> CreateCategoryAsync(Guid userId, ReqCreateCategory category);
        Task<Category> UpdateCategoryAsync(Guid userId, UpdateCategoryReq category);
        List<Category> GetAllCategoryAsync();
        Task<Category> GetCategoryAsync(Guid id);
        Task<Category> DeleteCategoryAsync(ReqDeleteCategory reqDeleteCategory);

        CategoryWithEditVM GetCategoriesWithEditAsync(Guid id);
        Task<PagingResponse> FilterCategoryWithPagingAsync(ReqFilterCategory reqFilterCategory);
    }
}
