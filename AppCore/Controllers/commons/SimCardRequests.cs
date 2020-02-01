using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class SimCardRequests
    {
    }

    public class ReqFilterSimCard
    {
        public virtual string Supplier { get; set; }
        public virtual int CurrentPage { get; set; } = 1;
        public virtual int PageSize { get; set; } = 50;
        public virtual int MinPrice { get; set; }
        public virtual int MaxPrice { get; set; }
        public virtual string FirstNumbers { get; set; }
        public virtual string EndNumbers { get; set; }
        public virtual List<string> ExceptNumbers { get; set; }
    }
}
