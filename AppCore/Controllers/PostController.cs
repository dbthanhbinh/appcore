using System;
using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    [EnableCors("AllowAllCors")]
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class PostController : BaseController
    {
        private readonly IPostLogic _postLogic;
        private readonly IMediaLogic _mediaLogic;

        public PostController(IPostLogic postLogic, IMediaLogic mediaLogic)
        {
            _postLogic = postLogic;
            _mediaLogic = mediaLogic;
        }

        /**
         * Create new Post 
         */
        [HttpPost("updatePost", Name = "UpdatePostAsync")]
        public async Task<ActionResult> UpdatePostAsync([FromForm] ReqUpdatePost reqData)
        {
            var result = await _postLogic.UpdatePostAsync(reqData);
            return Ok(new BaseResponse(result));
        }

        /**
         * Update Post 
         */
        [HttpPost("updatePostBusiness", Name = "UpdatePostBusinessAsync")]
        public async Task<ActionResult> UpdatePostBusinessAsync([FromForm] ReqUpdatePostBusiness reqData)
        {
            Guid userId = this.UserId;
            var result = await _postLogic.UpdatePostBusinessAsync(userId, reqData);
            return Ok(new BaseResponse(result));
        }

        /**
         * Create Post 
         */
        [HttpPost("createPost", Name = "CreatePostAsync")]
        public async Task<ActionResult> CreatePostAsync([FromForm] CreatePostReq createPostReq)
        {
            Guid userId = this.UserId;
            var result = await _postLogic.CreatePostAsync(userId, createPostReq);
            return Ok(new BaseResponse(result));
        }

        /*
         * Delete post
         */
        [HttpDelete("deletePost", Name = "DeletePostAsync")]
        public async Task<ActionResult> DeletePostAsync(ReqDeletePost reqDelete)
        {
            await _postLogic.DeletePostAsync(reqDelete);
            return Ok(new BaseResponse());
        }


        [HttpGet("getPostWithEdit/{id}", Name = "GetPostWithEdit")]
        public ActionResult getPostWithEdit(Guid id)
        {
            var result = _postLogic.GetPostWithEditAsync(id);
            return Ok(result);
        }

        // ======================For FrontEnd==========================================
        /*
         * Get all post
         */
        [HttpGet("getAll", Name = "GetAll")]
        public ActionResult GetAll()
        {
            object a = _postLogic.GetAll();
            return Ok(new BaseResponse(a));
        }

        /**
         * Get FilterPostsWithPagingAsync list all category from data base
         */
        [HttpGet("filterArticles/{postType}/{pageSize}/{currentPage}", Name = "FilterPosts")]
        public ActionResult FilterPostsWithPagingAsync(string postType, Int32 pageSize, Int32 currentPage)
        {
            FilterPostReq filterPostReq = new FilterPostReq
            {
                PageSize = pageSize,
                CurrentPage = currentPage,
                PostType = postType
            };
            var result = _postLogic.FilterPostsWithPagingAsync(filterPostReq);
            return Ok(new BaseResponse(result.Result.Data, result.Result.Paging));
        }

    }
}