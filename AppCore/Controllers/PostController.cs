﻿using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using Microsoft.AspNetCore.Mvc;

namespace AppCore.Controllers
{
    // [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : BaseController
    {
        private readonly string _postType = "Post";
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
        [HttpPost("createPost", Name = "CreatePost")]
        public async Task<ActionResult> CreatePostAsync([FromForm] ReqCreatePost reqData)
        {
            var result = await _postLogic.CreatePostAsync(reqData);
            return Ok(new BaseResponse(result));
        }

        /*
         * Delete post
         */
        [HttpPut("deletePost", Name = "DeletePost")]
        public ActionResult DeletePostAsync(ReqDeletePost reqDelete)
        {
            _postLogic.DeletePostAsync(reqDelete);
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
    }
}