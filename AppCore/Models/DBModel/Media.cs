using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Media : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public string SubName { get; set; } // alt for image or sub name for document
        public string Type { get; set; }
        public string Path { get; set; }
        public long Size { get; set; }
        public string CreatedBy { get; set; }
    }
}
