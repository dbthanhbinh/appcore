using AppCore.Models.DBModel;
using Microsoft.EntityFrameworkCore;

namespace AppCore.Models
{
    public class AppsContext : DbContext
    {
        public AppsContext(DbContextOptions<AppsContext> options) : base(options) {}
        DbSet<Post> Post { get; set; }
        DbSet<Category> Category { get; set; }
        DbSet<Media> Media { get; set; }
        DbSet<ObjectMedia> ObjectMedia { get; set; }
        DbSet<Seo> Seo { get; set; }
        DbSet<User> User { get; set; }
    }
}
