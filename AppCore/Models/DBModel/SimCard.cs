using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class SimCard : DbEntity
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Supplier { get; set; }
    }
}
