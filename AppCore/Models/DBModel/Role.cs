using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Role
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public string Slug { get; set; }
        public string CreatedBy { get; set; }
    }
}
