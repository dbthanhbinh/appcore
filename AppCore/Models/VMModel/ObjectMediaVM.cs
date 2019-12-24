using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class ObjectMediaVM
    {
    }

    public class UpdatedPostBusinessObjectMediaVM :  ObjectMedia
    {
        public UpdatedPostBusinessObjectMediaVM(ObjectMedia objectMedia)
        {
            Id = objectMedia.Id;
            ObjectId = objectMedia.ObjectId;
            MediaId = objectMedia.MediaId;
            MediaType = objectMedia.MediaType;
            ObjectType = objectMedia.ObjectType;
        }
        public virtual Media MediaInfo { get; set; }
    }
}
