using AppCore.Controllers.commons;
using AppCore.Helpers;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper _mapper;
        public ILogger<PostLogic> _logger { get; }

        public PostLogic(
            IUnitOfWork unit,
            IMediaLogic mediaLogic,
            IObjectMediaLogic objectMediaLogic,
            IObjectTagLogic objectTagLogic,
            ISeoLogic seoLogic,
            IMapper mapper,
            ILogger<PostLogic> logger
        )
        {
            _uow = unit;
            _logger = logger;
            _mediaLogic = mediaLogic;
            _objectMediaLogic = objectMediaLogic;
            _objectTagLogic = objectTagLogic;
            _mapper = mapper;
            _seoLogic = seoLogic;
        }

        public async Task<CreatedPostVM> CreatePostAsync(Guid userId, CreatePostReq createPostReq)
        {
            try
            {
                CreatedPostVM postVM = new CreatedPostVM();
                // Created Post
                _logger.LogWarning("Begin create post");
                Guid newId = new Guid();
                List<ObjectTag> objectTags = null;
                if (!string.IsNullOrEmpty(createPostReq.TagList))
                {
                    List<Guid> tagListIds = new List<Guid>();
                    tagListIds = createPostReq.TagList.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    objectTags = _objectTagLogic.GetObjectTagsManyToManyAsync(tagListIds, newId, createPostReq.PostType, userId);
                }

                Post postData = new Post
                {
                    Id = newId,
                    Name = createPostReq.Name,
                    CategoryId = createPostReq.CategoryId,
                    Content = createPostReq.Content,
                    Seo = new Seo
                    {
                        SeoTitle = createPostReq.SeoTitle,
                        SeoKeys = createPostReq.SeoKeys,
                        SeoDescription = createPostReq.SeoDescription,
                        ObjectId = newId,
                        CreatedBy = userId,
                        ModifiedBy = userId
                    },
                    ObjectTags = objectTags,
                    CreatedBy = userId,
                    ModifiedBy = userId
                };

                Task<bool> postCreated = _uow.GetRepository<Post>().AddAsync(postData);
                await Task.WhenAll(postCreated);

                // Created Object Post media
                Task<ObjectMedia> objectMediaCreated = _objectMediaLogic.CreateObjectMediaAsync(userId, createPostReq.File, postData.Id, createPostReq.PostType, "thumbnail");
                _uow.SaveChanges();
                await Task.WhenAll(objectMediaCreated);

                // Create tag object
                //if(!string.IsNullOrEmpty(reqData.TagList))
                //{
                //    List<Guid> tagListIds = new List<Guid>();
                //    tagListIds = reqData.TagList.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                //    await _objectTagLogic.CreateObjectTagsAsync(tagListIds, postData.Id, reqData.PostType);
                //}

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
        public async Task<ResUpdatePostBusiness> UpdatePostBusinessAsync(Guid userId, ReqUpdatePostBusiness reqUpdatePostBusiness)
        {
            try
            {
                ResUpdatePostBusiness resUpdatePostBusiness = new ResUpdatePostBusiness();
                _logger.LogInformation("Update post business");
                if (reqUpdatePostBusiness != null)
                {
                    Post postData = _uow.GetRepository<Post>()
                    .GetWithRelated(a => a.Id == reqUpdatePostBusiness.Id, null, "Seo")
                    .FirstOrDefault();

                    // Updated Tag list (ObjectTag)
                    await _objectTagLogic.UpdateObjectTagsBusinessAsync(
                        reqUpdatePostBusiness.TagList,
                        reqUpdatePostBusiness.TagListHidden,
                        reqUpdatePostBusiness.Id,
                        reqUpdatePostBusiness.PostType,
                        out List<ObjectTag> objectTags,
                        userId
                    );

                    postData.Name = reqUpdatePostBusiness.Name;
                    postData.Content = reqUpdatePostBusiness.Content;
                    postData.CategoryId = reqUpdatePostBusiness.CategoryId;

                    postData.Seo.SeoTitle = reqUpdatePostBusiness.SeoTitle;
                    postData.Seo.SeoKeys = reqUpdatePostBusiness.SeoKeys;
                    postData.Seo.SeoDescription = reqUpdatePostBusiness.SeoDescription;
                    postData.ModifiedBy = userId;

                    _uow.GetRepository<Post>().Update(postData);
                    resUpdatePostBusiness.PostUpdated = postData;
                    resUpdatePostBusiness.SeoUpdated = postData.Seo;
                    resUpdatePostBusiness.ObjectTagUpdated = objectTags;

                    // Update Object Media (feature image)
                    Task<Media> mediaUpdated = _objectMediaLogic.ObjectMediaUpdatePostBusinessAsync(reqUpdatePostBusiness.File, reqUpdatePostBusiness.Id, reqUpdatePostBusiness.PostType, "thumbnail", userId);
                    Task.WaitAll(mediaUpdated);
                    resUpdatePostBusiness.MediaUpdated = mediaUpdated.Result;
                    _uow.SaveChanges();
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
        public async Task<PagingResponse> FilterPostsWithPagingAsync(FilterPostReq filterPostReq)
        {
            try
            {
                int currentPage = filterPostReq.CurrentPage;
                int pageSize = filterPostReq.PageSize;
                string postType = filterPostReq.PostType;

                List<PostDataWithSortInfoVM> result = null;
                int countTotals = _uow.GetRepository<Post>().CountTotalByFilter(a => a.PostType == postType && a.IsActive == true);
                result = _uow.GetRepository<Post>()
                    .GetByFilterPaging(a => a.PostType == postType && a.IsActive == true, currentPage, pageSize)
                    .Select(s => _mapper.Map<PostDataWithSortInfoVM>(s)).ToList();

                List<PostDataWithSortInfoVM> postDataInListVMs = new List<PostDataWithSortInfoVM>();
                if (result != null && result.Count() > 0)
                {
                    foreach (PostDataWithSortInfoVM post in result)
                    {
                        Media media = (
                                       from ob in _uow.GetRepository<ObjectMedia>().GetByFilter(o => o.ObjectId == post.Id)
                                       join m in _uow.GetRepository<Media>().GetAll() on ob.MediaId equals m.Id
                                       select new Media { Name = m.Name, Path = m.Path }
                                      ).Distinct().FirstOrDefault();
                        PostDataWithSortInfoVM postDataInListVM = new PostDataWithSortInfoVM(post);
                        postDataInListVM.Media = media;
                        postDataInListVMs.Add(postDataInListVM);
                    }

                }

                var resultPg = PagingHelper<PostDataWithSortInfoVM>.GetPagingList(postDataInListVMs, currentPage, pageSize, countTotals);
                await Task.FromResult(resultPg);
                
                
                
                resultPg.Data = postDataInListVMs;
                return resultPg;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        /// <summary>
        /// Check if have any post in current categoryId
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public Post CheckPostInCategoryId(Guid categoryId)
        {
            Post postData = null;
            try
            {
                if (categoryId == null)
                {
                    return postData;
                }
                postData = _uow.GetRepository<Post>().GetByFilter(a => a.CategoryId == categoryId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }

            return postData;
        }

        public PostWithEditVM GetPostWithEditAsync(Guid id)
        {
            PostWithEditVM postWithEditVM = new PostWithEditVM();
            try
            {
                postWithEditVM.CategoryList = _uow.GetRepository<Category>().GetAll(); // Get all category
                postWithEditVM.TagList = _uow.GetRepository<Tag>().GetAll(); // Get all taglist
                //postWithEditVM.Post = _uow.GetRepository<Post>().Get(id);  // Get post object data

                postWithEditVM.Post = _uow.GetRepository<Post>()
                    .GetWithRelated(a => a.Id == id, null, "Seo,Category,ObjectTags")
                    .FirstOrDefault();  // Get post object data
                
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
                
                return postWithEditVM;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

    }
}
