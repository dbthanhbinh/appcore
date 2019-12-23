using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IObjectMediaLogic
    {
        Task<ObjectMedia> CreateObjectMediaAsync(IFormFile File, Guid objectId, string objectType, string mediaType);
        Task<ObjectMedia> ObjectMediaUpdatePostBusinessAsync(IFormFile File, Guid objectId, string objectType, string mediaType);
    }
}
