using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Controllers.commons;
using AppCore.Models.VMModel;

namespace AppCore.Business
{
    public class TagLogic : ITagLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<TagLogic> Logger { get; }

        public TagLogic(IUnitOfWork uow, ILogger<TagLogic> logger)
        {
            _uow = uow;
            Logger = logger;
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
                Logger.LogInformation("Create new tag");
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
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Update Tag
         */
        public async Task<Tag> UpdateTagAsync(UpdateTagReq tagData)
        {
            try
            {
                // Update Tag
                Logger.LogInformation("Update tag");
                Tag tag = _uow.GetRepository<Tag>().Get(tagData.Id);
                tag.Name = tagData.Name;

                string SlugName = StringHelper.GenerateSlug(tagData.Name);
                if (!string.IsNullOrEmpty(tagData.Slug))
                {
                    SlugName = StringHelper.GenerateSlug(tagData.Slug);
                }
                tag.Slug = SlugName;

                _uow.GetRepository<Tag>().Update(tag);
                _uow.SaveChanges();
                return await Task.FromResult(tag);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
        // * Delete Tag
        // */
        public async Task<Tag> DeleteTagAsync(ReqDeleteTag reqDelete)
        {
            try
            {
                var tag = new Tag
                {
                    Id = reqDelete.Id
                };
                _uow.GetRepository<Tag>().Delete(reqDelete.Id);
                _uow.SaveChanges();
                return await Task.FromResult(tag);
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
        public async Task<TagWithEditVM> GetTagWithEditAsync(Guid id)
        {
            TagWithEditVM tagWithEditVM = new TagWithEditVM();
            try
            {
                tagWithEditVM.TagList = _uow.GetRepository<Tag>().GetAll();
                tagWithEditVM.Tag = _uow.GetRepository<Tag>().Get(id);
                return await Task.FromResult(tagWithEditVM);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
