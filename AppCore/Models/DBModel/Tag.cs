using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Tag : DbEntity
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public virtual string Type { get; set; } = "general";
    }
}
