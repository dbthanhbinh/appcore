using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class CategoryRequests
    {
    }

    public class UpdateCategoryReq
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid ?ParentId { get; set; } = Guid.Empty;

        // For Seo
        public virtual string SeoTitle { get; set; }
        public virtual string SeoKeys { get; set; }
        public virtual string SeoDescription { get; set; }

        public virtual IFormFile File { get; set; }
    }

    public class ReqCreateCategory
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid ?ParentId { get; set; }

        // For Seo
        public virtual string SeoTitle { get; set; }
        public virtual string SeoKeys { get; set; }
        public virtual string SeoDescription { get; set; }

        public virtual IFormFile File { get; set; }
    }
}
