using AppCore.Controllers.commons;
using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.Repository;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class CategoryLogic : ICategoryLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<CategoryLogic> Logger { get; }
        private readonly ISeoLogic _seoLogic;

        public CategoryLogic(
            IUnitOfWork uow,
            ISeoLogic seoLogic,
            ILogger<CategoryLogic> logger
        )
        {
            _uow = uow;
            _seoLogic = seoLogic;
            Logger = logger;
        }

        /*
         * Create new Category
         */
        public async Task<CreatedCategoryVM> CreateCategoryAsync(Guid userId, ReqCreateCategory reqData)
        {
            try
            {
                CreatedCategoryVM createdCategoryVM = new CreatedCategoryVM();
                // Created Category
                Logger.LogInformation("Create new category");
                string SlugName = StringHelper.GenerateSlug(reqData.Name);
                reqData.Slug = SlugName;
                reqData.ParentId = reqData.ParentId ?? Guid.Empty;

                Guid newId = new Guid();
                Category categoryData = new Category
                {
                    Id = newId,
                    Name = reqData.Name,
                    ParentId = reqData.ParentId,
                    Slug = reqData.Slug,
                    CreatedBy = userId,
                    ModifiedBy = userId,
                    Seo = new Seo
                    {
                        SeoTitle = reqData.SeoTitle,
                        SeoKeys = reqData.SeoKeys,
                        SeoDescription = reqData.SeoDescription,
                        ObjectId = newId,
                        CreatedBy = userId,
                        ModifiedBy = userId
                    }
                };
                Task<bool> categoryCreated = _uow.GetRepository<Category>().AddAsync(categoryData);
                _uow.SaveChanges();

                createdCategoryVM.categoryData = categoryData;
                return await Task.FromResult(createdCategoryVM);

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Update Category
         */
        public async Task<Category> UpdateCategoryAsync(Guid userId, UpdateCategoryReq categoryData)
        {
            try
            {
                // Update category
                Logger.LogInformation("Update category");
                Category category = _uow.GetRepository<Category>()
                    .GetWithRelated(a => a.Id == categoryData.Id, null, "Seo")
                    .FirstOrDefault();

                category.Name = categoryData.Name;
                category.ParentId = categoryData.ParentId ?? Guid.Empty;

                string SlugName = StringHelper.GenerateSlug(categoryData.Name);
                if (!string.IsNullOrEmpty(categoryData.Slug))
                {
                    SlugName = StringHelper.GenerateSlug(categoryData.Slug);
                }
                category.Slug = SlugName;

                var seoData = category.Seo;
                seoData.SeoTitle = categoryData.SeoTitle;
                seoData.SeoKeys = categoryData.SeoKeys;
                seoData.SeoDescription = categoryData.SeoDescription;
                category.Seo = seoData;
                category.ModifiedBy = userId;

                _uow.GetRepository<Category>().Update(category);
                _uow.SaveChanges();
                return await Task.FromResult(category);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all category
         */
        public List<Category> GetAllCategoryAsync()
        {
            try
            {
                return _uow.GetRepository<Category>().GetAll();
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get FilterCategoryWithPagingAsync all category
         */
        public async Task<PagingResponse> FilterCategoryWithPagingAsync(ReqFilterCategory reqFilterCategory)
        {
            try
            {
                int currentPage = reqFilterCategory.CurrentPage;
                int pageSize = reqFilterCategory.PageSize;

                List<Category> result = null;
                result = _uow.GetRepository<Category>().GetAll();

                var resultPg = PagingHelper<Category>.GetPagingList(result, currentPage, pageSize);
                await Task.FromResult(resultPg);
                return resultPg;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all category with edit data
         */
        public CategoryWithEditVM GetCategoriesWithEditAsync(Guid id)
        {
            CategoryWithEditVM categoryWithEditVM = new CategoryWithEditVM();
            try
            {
                // categoryWithEditVM.CategoryList = _uow.GetRepository<Category>().GetAll();
                Category categoryData = _uow.GetRepository<Category>().GetWithRelated(a => a.Id == id, null, "Seo").FirstOrDefault();
                if(categoryData != null)
                {
                    categoryWithEditVM.Category = categoryData;
                }
                return categoryWithEditVM;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all category
         */
        public async Task<Category> GetCategoryAsync(Guid id)
        {
            try
            {
                var result = _uow.GetRepository<Category>().Get(id);
                return await Task.FromResult(result);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
        // * Delete category
        // */
        public async Task<Category> DeleteCategoryAsync(ReqDeleteCategory reqDelete)
        {
            try
            {
                var category = new Category
                {
                    Id = reqDelete.Id
                };
                _uow.GetRepository<Category>().Delete(reqDelete.Id);
                _uow.SaveChanges();
                return await Task.FromResult(category);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
