using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class PostLogic : BaseLogic, IPostLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<PostLogic> _logger { get; }

        public PostLogic(IUnitOfWork unit, ILogger<PostLogic> logger)
        {
            _uow = unit;
            _logger = logger;
        }

        public async Task<Post> CreatePostAsync(Post postData)
        {
            try
            {
                _logger.LogWarning("Create post");
                await _uow.GetRepository<Post>().AddAsync(postData);
                _uow.SaveChanges();
                return await Task.FromResult(postData);
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
