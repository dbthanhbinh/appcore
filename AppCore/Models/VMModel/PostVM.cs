using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class PostVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public long CategoryId { get; set; }
        public bool IsActive { get; set; }
    }
}
