﻿using System;
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
        public virtual string Type { get; set; }
    }
}
