using AppCore.Controllers.commons;
using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.Repository;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using AutoMapper;
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
        private readonly IPostLogic _postLogic;
        private readonly IMapper _mapper;

        public CategoryLogic(
            IUnitOfWork uow,
            ISeoLogic seoLogic,
            IPostLogic postLogic,
            IMapper mapper,
            ILogger<CategoryLogic> logger
        )
        {
            _uow = uow;
            _seoLogic = seoLogic;
            _mapper = mapper;
            _postLogic = postLogic;
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
                    Content = reqData.Content,
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

                createdCategoryVM.CategoryData = categoryData;
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
                category.Content = categoryData.Content;
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

                List<CategoryGetListVM> result = null;
                Int32 countTotals = _uow.GetRepository<Category>().CountTotalByFilter(x => x.IsActive == true);
                result = _uow.GetRepository<Category>().GetByFilterPaging(x => x.IsActive == true, currentPage, pageSize).Select(s => _mapper.Map<CategoryGetListVM>(s)).ToList();
                var resultPg = PagingHelper<CategoryGetListVM>.GetPagingList(result, currentPage, pageSize, countTotals);
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
         * Get GetCategoryAsync
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
        public DeleteCategoryResponse DeleteCategoryAsync(ReqDeleteCategory reqDelete)
        {
            DeleteCategoryResponse deleteCategoryResponse = new DeleteCategoryResponse();
            try
            {
                var postData = _postLogic.CheckPostInCategoryId(reqDelete.Id);
                Task<Category> categoryData = this.GetCategoryAsync(reqDelete.Id);

                if (postData == null)
                {   
                    _uow.GetRepository<Category>().Delete(categoryData.Result.Id);
                    _uow.SaveChanges();
                    deleteCategoryResponse.Data = categoryData.Result;
                }
                else
                {
                    deleteCategoryResponse.ApiResult = "ApiError";
                    deleteCategoryResponse.Message = "Can not delete this category! The category has post data";
                    deleteCategoryResponse.Data = categoryData.Result;
                }
                
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }

            return deleteCategoryResponse;
        }
    }
}
