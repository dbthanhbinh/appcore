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
        public List<Media> MediaPhotos { get; set; }
        public Media MediaThumbnal { get; set; }
    }

    public class PostDataWithSortInfoVM
    {
        public PostDataWithSortInfoVM()
        {

        }

        public PostDataWithSortInfoVM(PostDataWithSortInfoVM postDataWithSortInfoVM)
        {
            Id = postDataWithSortInfoVM.Id;
            Name = postDataWithSortInfoVM.Name;
            Slug = postDataWithSortInfoVM.Slug;
            PostType = postDataWithSortInfoVM.PostType;
            Status = postDataWithSortInfoVM.Status;
            CategoryId = postDataWithSortInfoVM.CategoryId;
            Created = postDataWithSortInfoVM.Created;
            IsActive = postDataWithSortInfoVM.IsActive;
            Modified = postDataWithSortInfoVM.Modified;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string PostType { get; set; }
        public string Status { get; set; }
        public Guid CategoryId { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

        public virtual Media Media { get; set; }
    }

    public class PostDataInListVM : Post
    {
        public PostDataInListVM(Post post)
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

    public class PostGetListVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
