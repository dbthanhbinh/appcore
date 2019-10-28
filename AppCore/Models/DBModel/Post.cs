using System;
using System.ComponentModel.DataAnnotations;

namespace AppCore.Models.DBModel
{
    public class Post : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        public string Content { get; set; }

        [Required]
        public Guid CategoryId { get; set; }
        public string CreatedBy { get; set; }
    }
}
