using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Media
    {
        public long Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        public string Type { get; set; }
        public string Path { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public float Size { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
