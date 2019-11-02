using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class ObjectTag : DbEntity
    {
        public Guid ObjectId { get; set; }
        public Guid TagId { get; set; }
        public string ObjectType { get; set; }
    }
}
