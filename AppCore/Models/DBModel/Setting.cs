using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class Setting : DbEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public string AutoLoad { get; set; } = "Yes";
        public string CustomValue { get; set; }
    }
}
