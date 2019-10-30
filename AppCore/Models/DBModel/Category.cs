using System.ComponentModel.DataAnnotations;

namespace AppCore.Models.DBModel
{
    public class Category : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }
        public string CreatedBy { get; set; }
    }
}
