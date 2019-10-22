using System.Threading.Tasks;
using AppCore.Business;
using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AppCore.Controllers
{
    // [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : BaseController
    {
        private readonly IPostLogic _postLogic;

        public PostController(IPostLogic postLogic)
        {
            _postLogic = postLogic;
        }

        /**
         * Create new Post 
         */
        [HttpPost("createPost", Name = "CreatePost")]
        public async Task<ActionResult> CreatePostAsync([FromBody] Post reqData)
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