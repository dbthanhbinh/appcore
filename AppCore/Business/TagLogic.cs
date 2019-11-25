using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Controllers.commons;

namespace AppCore.Business
{
    public class TagLogic : ITagLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<TagLogic> _logger { get; }

        public TagLogic(IUnitOfWork uow, ILogger<TagLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        public List<Tag> GetAll()
        {
            return _uow.GetRepository<Tag>().GetAll();
        }

        /*
         * Create new tag
         */
        public async Task<Tag> CreateTagAsync(ReqCreateTag reqData)
        {
            try
            {
                Tag createdTagVM = new Tag();
                // Created Category
                _logger.LogInformation("Create new tag");
                string SlugName = StringHelper.GenerateSlug(reqData.Name);
                if (SlugName != "")
                {
                    reqData.Slug = SlugName;
                }
                
                Tag tagData = new Tag
                {
                    Name = reqData.Name,
                    Slug = reqData.Slug
                };
                Task<bool> tagCreated = _uow.GetRepository<Tag>().AddAsync(tagData);
                _uow.SaveChanges();
                return await Task.FromResult(tagData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
