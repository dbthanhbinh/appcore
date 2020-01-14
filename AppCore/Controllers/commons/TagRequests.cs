using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class TagRequests
    {
        
    }

    public class ReqCreateTag
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid UserId { get; set; }
        public virtual string Type { get; set; }
    }

    public class ReqDeleteTag
    {
        public Guid Id { get; set; }
    }

    public class UpdateTagReq
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid UserId { get; set; }
    }
}
