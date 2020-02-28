using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.Mappings
{
    public class MappingPost : Profile
    {
        public MappingPost()
        {
            CreateMap<Post, PostGetListVM>();
            CreateMap<Post, PostDataWithSortInfoVM>();
        }
    }
}
