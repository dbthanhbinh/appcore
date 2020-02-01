using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class MenuVM
    {
    }

    public class CreatedMenuVM
    {
        public Menu menuData { get; set; }
    }

    public class MenuWithEditVM
    {
        public Menu Menu { get; set; }
        public List<Menu> MenuList { get; set; }
    }
}
