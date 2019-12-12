using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class MenuRequests
    {
    }

    public class UpdateMenuReq
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid? ParentId { get; set; } = Guid.Empty;
    }

    public class ReqCreateMenu
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid? ParentId { get; set; }
    }

    public class ReqFilterMenu
    {
        
    }

    public class ReqDeleteMenu
    {
        public Guid Id { get; set; }
    }
}
