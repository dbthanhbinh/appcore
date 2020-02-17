using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using FileService;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IMediaLogic
    {
        UploadedFull UploadFile(IFormFile file);
        Task<Media> CreateMediaAsync(Guid userId, IFormFile file);
        Task<PagingResponse> GetAllMedia();
        PagingResponse FilterMediasWithPagingAsync(FilterMediaReq filterMediaReq);
    }
}
