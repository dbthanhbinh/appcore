using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
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

        public CategoryLogic(IUnitOfWork uow, ILogger<CategoryLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        /*
         * Create new Category
         */
        public async Task<Category> CreateCategoryAsync(Category categoryData)
        {
            try
            {
                _logger.LogInformation("Create new category");
                await _uow.GetRepository<Category>().AddAsync(categoryData);
                _uow.SaveChanges();
                return await Task.FromResult(categoryData);
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

        ///*
        // * Delete category
        // */
        //public void DeleteCategoryAsync(ReqDeleteCategory reqDeleteCategory)
        //{

        //}
    }
}
