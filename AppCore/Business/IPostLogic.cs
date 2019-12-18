﻿using AppCore.Controllers.commons;
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
        Task<CreatedPostVM> CreatePostAsync(ReqCreatePost postData);
        Task<Post> UpdatePostAsync(ReqUpdatePost reqUpdatePost);
        Task<bool> DeletePostAsync(ReqDeletePost reqDelete);
        Task<PostWithEditVM> GetPostWithEditAsync(Guid id);


    }
}
