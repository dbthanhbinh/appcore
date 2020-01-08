using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class SeoRequests
    {
    }

    public class ReqDeleteSeo
    {
        public Guid Id { get; set; }
    }

    public class ReqUpdateSeo
    {
        public Guid Id { get; set; }
        public Guid ObjectId { get; set; }
        // For Seo
        public virtual string SeoTitle { get; set; }
        public virtual string SeoKeys { get; set; }
        public virtual string SeoDescription { get; set; }
    }

    public class ReqUpdateSeoHome
    {
        // For Seo
        public virtual string SeoTitle { get; set; }
        public virtual string SeoKeys { get; set; }
        public virtual string SeoDescription { get; set; }
    }
}
