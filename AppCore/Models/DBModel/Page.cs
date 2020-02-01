using System.ComponentModel.DataAnnotations;

namespace AppCore.Models.DBModel
{
    public class Page : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        public string Content { get; set; }
    }
}
