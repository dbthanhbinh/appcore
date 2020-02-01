using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class RoleRequests
    {
    }

    public class CreateRoleReq
    {
        public string Name { get; set; }
        public string Slug { get; set; }
    }
}
