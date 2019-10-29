using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class CreatedPostVM
    {
        public Post postData { get; set; }
        public Media mediaData { get; set; }
        public ObjectMedia objectMediaData { get; set; }
    }

    public class PostListVM
    {

    }
}
