using System;
using System.ComponentModel.DataAnnotations;

namespace AppCore.Models.DBModel
{
    public class Category : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public string Slug { get; set; }
        public Guid ?ParentId { get; set; } = Guid.Empty;
        public string CreatedBy { get; set; }
    }
}
