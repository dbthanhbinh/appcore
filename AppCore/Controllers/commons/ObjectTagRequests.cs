using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class ObjectTagRequests
    {
    }

    public class ObjectTagItem
    {
        public Guid Id { get; set; }
        public Guid TagId { get; set; }
        public string IsActive { get; set; }
    }

    public class ObjectListTagsInitial
    {
        public List<ObjectTagItem> ListAllTags = new List<ObjectTagItem>();
        public ObjectListTagsInitial(List<Guid> guids, string action)
        {
            foreach(Guid guid in guids)
            {
                ObjectTagItem objectTagInitial = new ObjectTagItem
                {
                    TagId = guid,
                    IsActive = action
                };
                this.ListAllTags.Add(objectTagInitial);
            }
        }
    }
}
