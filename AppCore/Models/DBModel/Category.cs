using System.ComponentModel.DataAnnotations;

namespace AppCore.Models.DBModel
{
    public class Category
    {
        public long Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
