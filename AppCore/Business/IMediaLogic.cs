using FileService;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IMediaLogic
    {
        Task<Uploaded> UploadFile(IFormFile file);
    }
}
