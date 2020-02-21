﻿using AppCore.Business.Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppCore.Models.DBModel
{
    public class Category : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        [Required]
        public string Slug { get; set; }
        public string Content { get; set; }
        public string CategoryType { get; set; } = CategoryTypes.Default;
        public Guid ?ParentId { get; set; } = Guid.Empty;
        public virtual Seo Seo { get; set; }
    }
}
