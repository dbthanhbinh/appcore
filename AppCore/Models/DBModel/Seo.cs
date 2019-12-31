using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppCore.Models.DBModel
{
    public class Seo : DbEntity
    {
        public string SeoTitle { get; set; }
        public string SeoKeys { get; set; }
        public string SeoDescription { get; set; }
        public string Slug { get; set; }
        public string ObjectType { get; set; }
        public Guid ObjectId { get; set; }

        public virtual Category Category { get; set; }
    }
}
