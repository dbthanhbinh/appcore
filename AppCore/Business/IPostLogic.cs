using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IPostLogic : IBaseLogic<Post>
    {
        Task<CreatedPostVM> CreatePostAsync(Guid userId, CreatePostReq createPostReq);
        Task<Post> UpdatePostAsync(ReqUpdatePost reqUpdatePost);
        Task<ResUpdatePostBusiness> UpdatePostBusinessAsync(Guid userId, ReqUpdatePostBusiness reqUpdatePostBusiness);
        Task<bool> DeletePostAsync(ReqDeletePost reqDelete);
        Task<PagingResponse> FilterPostsWithPagingAsync(FilterPostReq filterPostReq);
        PostWithEditVM GetPostWithEditAsync(Guid id);
        Post CheckPostInCategoryId(Guid categoryId);
    }
}
