using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class MediaRequest
    {
    }

    public class FilterMediaReq
    {
        public virtual int CurrentPage { get; set; } = 1;
        public virtual int PageSize { get; set; } = 10;
        public virtual string ResizeType { get; set; } = "small";
    }
}
