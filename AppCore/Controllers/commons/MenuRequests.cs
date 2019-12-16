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
        public string SubName { get; set; }
        public string Slug { get; set; }
        public Guid? ParentId { get; set; }
        public string IconClass { get; set; }
        public string IconPath { get; set; }
        public string Target { get; set; }
        public string StandardUrl { get; set; }
        public string CustomUrl { get; set; }
        public string ObjectType { get; set; }
        public string GroupMenu { get; set; }
    }

    public class ReqFilterMenu
    {
        
    }

    public class ReqDeleteMenu
    {
        public Guid Id { get; set; }
    }
}
