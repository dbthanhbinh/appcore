using AppCore.Business.Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppCore.Models.DBModel
{
    public class Post : DbEntity
    {   
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public string Content { get; set; }
        public string Status { get; set; } = PostStatus.Publish;
        public string PostType { get; set; } = PostTypes.Default;

        public Guid? CategoryId { get; set; }
        public string CreatedBy { get; set; }
        public Category Category { get; set; }
        public Seo Seo { get; set; }
    }
}
