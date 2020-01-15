using AppCore.Business.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.DBModel
{
    public class DbEntity
    {
        public Guid Id { get; set; } = new Guid();
        public bool IsActive { get; set; } = PostActive.Active;
        public DateTime Created { get; set; } = TimeNow.DateTime;
        public Guid CreatedBy { get; set; }

        public DateTime Modified { get; set; } = TimeNow.DateTime;
        public Guid ModifiedBy { get; set; }
    }
}
