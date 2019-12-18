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
    [Authorize]
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
        [HttpPost("createPost", Name = "CreatePostAsync")]
        public async Task<ActionResult> CreatePostAsync([FromForm] ReqCreatePost reqData)
        {
            var result = await _postLogic.CreatePostAsync(reqData);
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
        [HttpGet("filterPosts/{pageSize}/{currentPage}", Name = "FilterPosts")]
        public ActionResult FilterPostsWithPagingAsync(Int32 pageSize, Int32 currentPage)
        {
            ReqFilterPost reqFilterPost = new ReqFilterPost
            {
                PageSize = pageSize,
                CurrentPage = currentPage
            };
            var result = _postLogic.FilterPostsWithPagingAsync(reqFilterPost);
            return Ok(new BaseResponse(result.Result.Data, result.Result.Paging));
        }

        [HttpGet("getPostWithEdit/{id}", Name = "GetPostWithEdit")]
        public ActionResult getPostWithEdit(Guid id)
        {
            var result = _postLogic.GetPostWithEditAsync(id);
            return Ok(new BaseResponse(result.Result));
        }
    }
}