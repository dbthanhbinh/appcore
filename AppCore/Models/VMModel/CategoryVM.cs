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
        public Category CategoryData { get; set; }
        public Seo SeoData { get; set; }
    }

    public class CategoryWithEditVM
    {
        public Category Category { get; set; }
        public object CategoryList { get; set; }
    }

    public class CategoryAllVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string CategoryType { get; set; }
        public bool IsActive { get; set; }
    }

    public class CategoryGetListVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string CategoryType { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public Guid? ParentId { get; set; }
    }
}
