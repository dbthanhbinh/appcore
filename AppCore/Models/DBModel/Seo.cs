using System;
namespace AppCore.Models.DBModel
{
    public class Seo : DbEntity
    {
        public string SeoTitle { get; set; }
        public string SeoKeys { get; set; }
        public string SeoDescription { get; set; }
        public Guid ObjectId { get; set; }
    }
}
