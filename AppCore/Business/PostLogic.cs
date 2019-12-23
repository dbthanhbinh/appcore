using AppCore.Controllers.commons;
using AppCore.Helpers;
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
                // Created Post
                _logger.LogWarning("Begin create post");
                Post postData = new Post();
                postData.Name = reqData.Name;
                postData.CategoryId = reqData.CategoryId;
                postData.Content = reqData.Content;
                Task<bool> postCreated = _uow.GetRepository<Post>().AddAsync(postData);
                await Task.WhenAll(postCreated);

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
                Task<ObjectMedia> objectMediaCreated = _objectMediaLogic.CreateObjectMediaAsync(reqData.File, postData.Id, reqData.PostType, "thumbnail");
                _uow.SaveChanges();
                await Task.WhenAll(objectMediaCreated);

                // Create tag object
                if(!string.IsNullOrEmpty(reqData.TagList))
                {
                    List<Guid> tagListIds = new List<Guid>();
                    tagListIds = reqData.TagList.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    await _objectTagLogic.CreateObjectTagsAsync(tagListIds, postData.Id, reqData.PostType);
                }

                postVM.postData = postData;
                postVM.mediaData = null;
                postVM.objectMediaData = objectMediaCreated.Result;
                return postVM;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Update post
         */
        public Task<Post> UpdatePostAsync(ReqUpdatePost reqUpdatePost)
        {
            try
            {
                _logger.LogInformation("Update post");
                Post postData = _uow.GetRepository<Post>().Get(reqUpdatePost.Id);
                if (postData != null)
                {
                    postData.Name = reqUpdatePost.Name;
                    postData.Content = reqUpdatePost.Content;
                    postData.CategoryId = reqUpdatePost.CategoryId;
                    // Update data for post.
                    _uow.GetRepository<Post>().Update(postData);
                    _uow.SaveChanges();
                    return Task.FromResult(postData);
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /*
         * Update post
         */
        public async Task<ResUpdatePostBusiness> UpdatePostBusinessAsync(ReqUpdatePostBusiness reqUpdatePostBusiness)
        {
            try
            {
                ResUpdatePostBusiness resUpdatePostBusiness = new ResUpdatePostBusiness();
                _logger.LogInformation("Update post business");
                if (reqUpdatePostBusiness != null)
                {
                    // Update data for post.
                    ReqUpdatePost reqUpdatePost = new ReqUpdatePost
                    {
                        Id = reqUpdatePostBusiness.Id,
                        Name = reqUpdatePostBusiness.Name,
                        Content = reqUpdatePostBusiness.Content,
                        CategoryId = reqUpdatePostBusiness.CategoryId,
                        File = reqUpdatePostBusiness.File
                    };
                    Task<Post> postUpdated = this.UpdatePostAsync(reqUpdatePost);

                    // Update Object Media (feature image)
                    Task<ObjectMedia> objectMediaUpdated = _objectMediaLogic.ObjectMediaUpdatePostBusinessAsync(reqUpdatePostBusiness.File, reqUpdatePostBusiness.Id, reqUpdatePostBusiness.PostType, "thumbnail");


                    // Update seo data
                    ReqUpdateSeo reqUpdateSeo = new ReqUpdateSeo
                    {
                        ObjectId = reqUpdatePostBusiness.Id,
                        SeoTitle = reqUpdatePostBusiness.SeoTitle,
                        SeoKeys = reqUpdatePostBusiness.SeoKeys,
                        SeoDescription = reqUpdatePostBusiness.SeoDescription
                    };
                    Task<Seo> seoUpdated = _seoLogic.UpdateSeoAsync(reqUpdateSeo);

                    // Updated Tag list (ObjectTag)
                    Task<List<ObjectTagItem>> objectTagUpdated = _objectTagLogic.UpdateObjectTagsBusinessAsync(reqUpdatePostBusiness.TagList, reqUpdatePostBusiness.TagListHidden, reqUpdatePostBusiness.Id, reqUpdatePostBusiness.PostType);

                    await Task.WhenAll(postUpdated, seoUpdated, objectMediaUpdated, objectTagUpdated);

                    resUpdatePostBusiness.PostUpdated = postUpdated.Result;
                    resUpdatePostBusiness.SeoUpdated = seoUpdated.Result;
                    resUpdatePostBusiness.ObjectTagUpdated = objectTagUpdated.Result;
                    resUpdatePostBusiness.ObjectMediaUpdated = objectMediaUpdated.Result;
                }
                
                return resUpdatePostBusiness;
            }
            catch (Exception ex)
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

        /*
         * Get FilterPostsWithPagingAsync all category
         */
        public async Task<PagingResponse> FilterPostsWithPagingAsync(ReqFilterPost reqFilterPost)
        {
            try
            {
                int currentPage = reqFilterPost.CurrentPage;
                int pageSize = reqFilterPost.PageSize;

                List<Post> result = null;
                result = _uow.GetRepository<Post>().GetAll();
                
                var resultPg = PagingHelper<Post>.GetPagingList(result, currentPage, pageSize);
                await Task.FromResult(resultPg);
                return resultPg;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public async Task<PostWithEditVM> GetPostWithEditAsync(Guid id)
        {
            PostWithEditVM postWithEditVM = new PostWithEditVM();
            try
            {
                postWithEditVM.CategoryList = _uow.GetRepository<Category>().GetAll(); // Get all category
                postWithEditVM.TagList = _uow.GetRepository<Tag>().GetAll(); // Get all taglist
                postWithEditVM.PostTagList = _uow.GetRepository<ObjectTag>().GetByFilter((x) => x.ObjectId == id);
                postWithEditVM.Post = _uow.GetRepository<Post>().Get(id);  // Get post object data
                IEnumerable<Seo> enumerable = _uow.GetRepository<Seo>().Get((x) => x.ObjectId == id);
                postWithEditVM.Seo = enumerable.FirstOrDefault(); // Get Post SEO object data

                List<Guid> objectGuids = _uow.GetRepository<ObjectMedia>().GetByFilter(m => m.ObjectId == id).Select(s => s.MediaId).ToList();
                if(objectGuids.Count > 0)
                {
                    // For post thumbnail
                    MediaJoinInfo objectMediaThumb =
                        _uow.GetRepository<ObjectMedia>().GetByFilter(m => m.ObjectId == id && m.MediaType == "thumbnail")
                        .Join(_uow.GetRepository<Media>().GetByFilter(y => objectGuids.Contains(y.Id)), q => q.MediaId, m => m.Id, (q, m) => new MediaJoinInfo { MediaType = q.MediaType, Media = m })
                        .ToList().FirstOrDefault();
                    if(objectMediaThumb != null)
                    {
                        postWithEditVM.MediaThumbnal = objectMediaThumb.Media;
                    }
                }
                
                return await Task.FromResult(postWithEditVM);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

    }
}
