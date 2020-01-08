using AppCore.Models.DBModel;
using Microsoft.EntityFrameworkCore;

namespace AppCore.Models
{
    public class AppsContext : DbContext
    {
        public AppsContext(DbContextOptions<AppsContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ObjectTag>()
                .HasKey(bc => new { bc.ObjectId, bc.TagId });
            builder.Entity<ObjectTag>()
                .HasOne(bc => bc.Post)
                .WithMany(b => b.ObjectTags)
                .HasForeignKey(bc => bc.ObjectId);
            builder.Entity<ObjectTag>()
                .HasOne(bc => bc.Tag)
                .WithMany(c => c.ObjectTags)
                .HasForeignKey(bc => bc.TagId);
        }

        DbSet<Post> Post { get; set; }
        DbSet<Category> Category { get; set; }
        DbSet<Media> Media { get; set; }
        DbSet<ObjectMedia> ObjectMedia { get; set; }
        DbSet<Seo> Seo { get; set; }
        DbSet<User> User { get; set; }
        DbSet<SimCard> SimCard { get; set; }
        DbSet<Tag> Tag { get; set; }
        DbSet<ObjectTag> ObjectTag { get; set; }
        DbSet<Menu> Menu { get; set; }
        DbSet<Page> Page { get; set; }
        DbSet<Setting> Setting { get; set; }
        DbSet<Role> Role { get; set; }
    }
}
