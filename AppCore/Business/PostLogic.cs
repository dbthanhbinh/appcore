using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class PostLogic : BaseLogic, IPostLogic
    {
        private readonly IUnitOfWork _uow;
        private readonly IMediaLogic _mediaLogic;
        private readonly ISeoLogic _seoLogic;
        private readonly IObjectMediaLogic _objectMediaLogic;
        private readonly IObjectTagLogic _objectTagLogic;
        public ILogger<PostLogic> _logger { get; }

        public PostLogic(
            IUnitOfWork unit,
            IMediaLogic mediaLogic,
            IObjectMediaLogic objectMediaLogic,
            IObjectTagLogic objectTagLogic,
            ISeoLogic seoLogic,
            ILogger<PostLogic> logger
        )
        {
            _uow = unit;
            _logger = logger;
            _mediaLogic = mediaLogic;
            _objectMediaLogic = objectMediaLogic;
            _objectTagLogic = objectTagLogic;
            _seoLogic = seoLogic;
        }

        public async Task<CreatedPostVM> CreatePostAsync(ReqCreatePost reqData)
        {
            try
            {
                CreatedPostVM postVM = new CreatedPostVM();

                // Created Media
                Task<Media> mediaCreated = _mediaLogic.CreateMediaAsync(reqData.File);

                // Created Post
                _logger.LogWarning("Begin create post");
                Post postData = new Post();
                postData.Name = reqData.Name;
                postData.CategoryId = reqData.CategoryId;
                postData.Content = reqData.Content;
                Task<bool> postCreated = _uow.GetRepository<Post>().AddAsync(postData);
                await Task.WhenAll(mediaCreated, postCreated);

                // Created seo
                Task<Seo> seoCreated = null;
                if (reqData.SeoTitle != null || reqData.SeoKeys != null || reqData.SeoDescription != null)
                {
                    Seo seoDb = new Seo
                    {
                        SeoTitle = reqData.SeoTitle,
                        SeoKeys = reqData.SeoKeys,
                        SeoDescription = reqData.SeoDescription,
                        ObjectId = postData.Id
                    };
                    seoCreated = _seoLogic.CreateSeoAsync(seoDb);
                }

                // Created Object Post media
                Task<ObjectMedia> objectMediaCreate = _objectMediaLogic.CreateObjectMediaAsync(mediaCreated.Result.Id, postData.Id, reqData.PostType);
                _uow.SaveChanges();
                await Task.WhenAll(objectMediaCreate);

                // Create tag object
                if(!string.IsNullOrEmpty(reqData.TagList))
                {
                    List<Guid> tagListIds = new List<Guid>();
                    tagListIds = reqData.TagList.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    await _objectTagLogic.CreateObjectTagsAsync(tagListIds, postData.Id, reqData.PostType);
                }

                postVM.postData = postData;
                postVM.mediaData = mediaCreated.Result;
                postVM.objectMediaData = objectMediaCreate.Result;
                return postVM;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public async Task<bool> DeletePostAsync(ReqDeletePost reqDelete)
        {
            try
            {
                await _seoLogic.DeleteSeoWithObjectIdAsync(reqDelete.Id);
                await this.DeletePost(reqDelete.Id);
                _uow.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public async Task<Post> DeletePost(Guid id)
        {
            try
            {
                var post = new Post();
                post.Id = id;
                _uow.GetRepository<Post>().Delete(id);
                return await Task.FromResult(post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }



        public List<Post> GetAll()
        {
            return _uow.GetRepository<Post>().GetAll();
        }
    }
}
