using System;

namespace AppCore.Models.DBModel
{
    public class ObjectTag : DbEntity
    {
        public Guid ObjectId { get; set; }
        public Guid TagId { get; set; }
        public virtual string ObjectType { get; set; }

        public virtual Post Post { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
