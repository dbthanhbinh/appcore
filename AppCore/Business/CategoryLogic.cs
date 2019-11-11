using AppCore.Controllers.commons;
using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.Repository;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
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
        public ILogger<CategoryLogic> _logger { get; }
        private readonly ISeoLogic _seoLogic;
        private readonly IObjectMediaLogic _objectMediaLogic;

        public CategoryLogic(
            IUnitOfWork uow,
            ISeoLogic seoLogic,
            IObjectMediaLogic objectMediaLogic,
            ILogger<CategoryLogic> logger
        )
        {
            _uow = uow;
            _seoLogic = seoLogic;
            _objectMediaLogic = objectMediaLogic;
            _logger = logger;
        }

        /*
         * Create new Category
         */
        public async Task<CreatedCategoryVM> CreateCategoryAsync(ReqCreateCategory reqData)
        {
            try
            {
                CreatedCategoryVM createdCategoryVM = new CreatedCategoryVM();
                // Created Category
                _logger.LogInformation("Create new category");
                string SlugName = StringHelper.GenerateSlug(reqData.Name);
                reqData.Slug = SlugName;
                reqData.ParentId = reqData.ParentId ?? Guid.Empty;

                Category categoryData = new Category
                {
                    Name = reqData.Name,
                    ParentId = reqData.ParentId,
                    Slug = reqData.Slug
                };
                Task<bool> categoryCreated = _uow.GetRepository<Category>().AddAsync(categoryData);

                // Created seo
                _logger.LogInformation("Create new seo");
                Task<Seo> seoCreated = null;
                Seo seoData = new Seo();
                seoData.SeoTitle = reqData.SeoTitle;
                seoData.SeoKeys = reqData.SeoKeys;
                seoData.SeoDescription = reqData.SeoDescription;
                seoData.ObjectId = categoryData.Id;
                seoCreated = _seoLogic.CreateSeoAsync(seoData);

                _uow.SaveChanges();
                await Task.WhenAll(categoryCreated, seoCreated);

                createdCategoryVM.categoryData = categoryData;
                createdCategoryVM.seoData = seoData;
                return await Task.FromResult(createdCategoryVM);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Update Category
         */
        public async Task<Category> UpdateCategoryAsync(UpdateCategoryReq categoryData)
        {
            try
            {
                // Update category
                _logger.LogInformation("Update category");
                Category category = _uow.GetRepository<Category>().Get(categoryData.Id);
                category.Name = categoryData.Name;
                category.ParentId = categoryData.ParentId ?? Guid.Empty;
                _uow.GetRepository<Category>().Update(category);
                

                // Update seo
                _logger.LogInformation("Update seo");
                var qr = _uow.GetRepository<Seo>();
                IEnumerable<Seo> enumerable = qr.Get((x) => x.ObjectId == categoryData.Id);

                var seoData = enumerable.FirstOrDefault();
                if(seoData != null)
                {
                    seoData.SeoTitle = categoryData.SeoTitle;
                    seoData.SeoKeys = categoryData.SeoKeys;
                    seoData.SeoDescription = categoryData.SeoDescription;
                    qr.Update(seoData);
                }

                _uow.SaveChanges();
                return await Task.FromResult(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
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
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Get list all category with edit data
         */
        public async Task<CategoryWithEditVM> GetCategoriesWithEditAsync(Guid id)
        {
            CategoryWithEditVM categoryWithEditVM = new CategoryWithEditVM();
            try
            {
                categoryWithEditVM.CategoryList = _uow.GetRepository<Category>().GetAll();
                categoryWithEditVM.Category = _uow.GetRepository<Category>().Get(id);
                IEnumerable<Seo> enumerable = _uow.GetRepository<Seo>().Get((x) => x.ObjectId == id);
                categoryWithEditVM.Seo = enumerable.FirstOrDefault();
                return await Task.FromResult(categoryWithEditVM);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
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
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        ///*
        // * Delete category
        // */
        public async Task<Category> DeleteCategoryAsync(ReqDeleteCategory reqDelete)
        {
            try
            {
                var category = new Category();
                category.Id = reqDelete.Id;
                _uow.GetRepository<Category>().Delete(reqDelete.Id);
                _uow.SaveChanges();
                return await Task.FromResult(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
