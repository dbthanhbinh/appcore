using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Controllers.commons;
using AppCore.Models.VMModel;

namespace AppCore.Business
{
    public interface ITagLogic
    {
        List<Tag> GetAll();
        PagingResponse FilterTagsWithPagingAsync(FilterTagReq filterTagReq);
        Task<Tag> CreateTagAsync(ReqCreateTag reqData);
        Task<Tag> DeleteTagAsync(ReqDeleteTag reqDelete);
        Task<TagWithEditVM> GetTagWithEditAsync(Guid id);
        Task<Tag> UpdateTagAsync(UpdateTagReq tagData);
    }
}
