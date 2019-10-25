using AppCore.Models.DBModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models
{
    public class AppsContext : DbContext
    {
        public AppsContext(DbContextOptions<AppsContext> options) : base(options) {}
        DbSet<Post> Post { get; set; }
        DbSet<Category> Category { get; set; }
        DbSet<Media> Media { get; set; }
    }
}
