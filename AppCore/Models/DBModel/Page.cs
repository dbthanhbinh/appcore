using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Page : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        public string Content { get; set; }
        public string CreatedBy { get; set; }
    }
}
