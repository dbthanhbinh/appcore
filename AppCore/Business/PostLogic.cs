using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class PostLogic : BaseLogic, IPostLogic
    {
        private readonly IUnitOfWork _uow;
        private readonly IMediaLogic _mediaLogic;
        private readonly ISeoLogic _seoLogic;
        private readonly IObjectMediaLogic _objectMediaLogic;
        public ILogger<PostLogic> _logger { get; }

        public PostLogic(IUnitOfWork unit, IMediaLogic mediaLogic, IObjectMediaLogic objectMediaLogic, ISeoLogic seoLogic, ILogger<PostLogic> logger)
        {
            _uow = unit;
            _logger = logger;
            _mediaLogic = mediaLogic;
            _objectMediaLogic = objectMediaLogic;
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
                Post postData = new Post
                {
                    Name = reqData.Name,
                    CategoryId = reqData.CategoryId,
                    Content = reqData.Content
                };                
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

        public void DeletePostAsync(ReqDeletePost reqDelete)
        {
            try
            {
                var post = new Post();
                post.Id = reqDelete.Id;
                _uow.GetRepository<Post>().Delete(reqDelete.Id);
                _uow.SaveChanges();
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
