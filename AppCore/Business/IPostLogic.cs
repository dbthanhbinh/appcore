using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IPostLogic : IBaseLogic<Post>
    {
        Task<Post> CreatePostAsync(Post postData);
        void DeletePostAsync(ReqDeletePost reqDelete);
        
    }
}
