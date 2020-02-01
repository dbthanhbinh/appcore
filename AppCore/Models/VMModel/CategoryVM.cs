using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class CategoryVM
    {
    }

    public class CreatedCategoryVM
    {
        public Category categoryData { get; set; }
        public Seo seoData { get; set; }
    }

    public class CategoryWithEditVM
    {
        public Category Category { get; set; }
        public object CategoryList { get; set; }
    }
}
