using System;

namespace AppCore.Models.DBModel
{
    public class ObjectMedia : DbEntity
    {
        public Guid ObjectId { get; set; }
        public Guid MediaId { get; set; }
        public string ObjectType { get; set; }
    }
}
