using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IObjectMediaLogic
    {
        Task<ObjectMedia> CreateObjectMediaAsync(Guid userId, IFormFile File, Guid objectId, string objectType, string mediaType);
        Task<Media> ObjectMediaUpdatePostBusinessAsync(IFormFile File, Guid objectId, string objectType, string mediaType, Guid userId);
    }
}
