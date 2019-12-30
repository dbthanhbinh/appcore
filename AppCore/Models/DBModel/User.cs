using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class User : DbEntity
    {
        [Required]
        [DataType(DataType.Text)]
        public string FullName { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        //[Index(IsUnique = true)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        public virtual string Token { get; set; }
    }
}
