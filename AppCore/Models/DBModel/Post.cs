using System.ComponentModel.DataAnnotations;

namespace AppCore.Models.DBModel
{
    public class Post
    {
        public long Id { get; set; }
        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        public string Content { get; set; }

        [Required]
        public long CategoryId { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
