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

    public class ReqDetailCategory
    {
        public Guid Id { get; set; }
    }

    public class CreatePostReq {
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid? CategoryId { get; set; }
        public virtual string TagList { get; set; }
        // For Seo
        public virtual string SeoTitle { get; set; }
        public virtual string SeoKeys { get; set; }
        public virtual string SeoDescription { get; set; }

        public virtual IFormFile File { get; set; }
        public virtual string PostType { get; set; } = "post";
    }

    public class FilterPostReq
    {
        public virtual string PostType { get; set; } = "post";
        public virtual int CurrentPage { get; set; } = 1;
        public virtual int PageSize { get; set; } = 10;
    }

    public class ReqUpdatePost
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid? CategoryId { get; set; }
        public virtual IFormFile File { get; set; }
        public virtual string PostType { get; set; } = "post";
    }

    public class ReqUpdatePostBusiness
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public Guid? CategoryId { get; set; }
        public virtual string TagList { get; set; }
        public virtual string TagListHidden { get; set; }
        // For Seo
        public virtual string SeoTitle { get; set; }
        public virtual string SeoKeys { get; set; }
        public virtual string SeoDescription { get; set; }

        public virtual IFormFile File { get; set; }
        public virtual string PostType { get; set; } = "post";
    }

    public class ResUpdatePostBusiness
    {
        public Post PostUpdated { set; get; }
        public Seo SeoUpdated { get; set; }
        public List<ObjectTagItem> ObjectTagUpdated { get; set; }
        public ObjectMedia ObjectMediaUpdated { get; set; }
    }
}
