using AppCore.Business.Commons;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class User
    {

        public Guid Id { get; set; } = new Guid();

        [Required]
        [DataType(DataType.Text)]
        public string FullName { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public virtual string Token { get; set; }

        public bool IsActive { get; set; } = PostActive.Active;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Modified { get; set; } = DateTime.Now;
    }
}
