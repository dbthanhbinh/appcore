using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class PostVM
    {
    }

    public class PostWithEditVM
    {
        public Post Post { get; set; }
        public List<Category> CategoryList { get; set; }
        public List<Tag> TagList { get; set; }
        public List<ObjectTag> PostTagList { get; set; }
        public List<Media> MediaPhotos { get; set; }
        public Media MediaThumbnal { get; set; }
        public Seo Seo { get; set; }
    }

    public class ListPostDataVM : Post
    {
        public ListPostDataVM(Post post)
        {
            Id = post.Id;
            Name = post.Name;
            Content = post.Content;
            Status = post.Status;
            PostType = post.PostType;
            CategoryId = post.CategoryId;
            CreatedBy = post.CreatedBy;
            Created = post.Created;
        }
        public virtual Media Media { get; set; }
    }
}
