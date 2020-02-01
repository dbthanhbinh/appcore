using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class TagVM
    {
    }

    public class TagWithEditVM
    {
        public Tag Tag{ get; set; }
        public List<Tag> TagList { get; set; }
    }
}
