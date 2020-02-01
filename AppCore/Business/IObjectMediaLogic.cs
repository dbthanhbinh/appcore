using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IObjectMediaLogic
    {
        Task<ObjectMedia> CreateObjectMediaAsync(IFormFile File, Guid objectId, string objectType, string mediaType);
        Task<UpdatedPostBusinessObjectMediaVM> ObjectMediaUpdatePostBusinessAsync(IFormFile File, Guid objectId, string objectType, string mediaType);
    }
}
