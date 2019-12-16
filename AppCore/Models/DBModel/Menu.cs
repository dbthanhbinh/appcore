using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Menu : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public string SubName { get; set; }
        public string Slug { get; set; }
        public Guid? ParentId { get; set; }
        public string IconClass { get; set; }
        public string IconPath { get; set; }
        public string Target { get; set; }
        public string StandardUrl { get; set; }
        public string CustomUrl { get; set; }
        public string ObjectType { get; set; }
        public string GroupMenu { get; set; }
    }
}
