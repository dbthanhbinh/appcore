using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class Requests
    {
    }

    public class ReqDeletePost
    {
        public Guid Id { get; set; }
    }

    public class ReqDeleteCategory
    {
        public Guid Id { get; set; }
    }

    public class ReqCreatePost {
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid CategoryId { get; set; }
        public IFormFile File { get; set; }

        public virtual string PostType { get; set; } = "Post";
    }
}
