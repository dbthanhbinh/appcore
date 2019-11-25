using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using FileService;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IMediaLogic
    {
        Uploaded UploadFile(IFormFile file);
        Task<Media> CreateMediaAsync(IFormFile file);
        // List<Media> GetAll();
        Task<PagingResponse> GetAll();
    }
}
