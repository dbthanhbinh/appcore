using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using FileService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class MediaLogic : IMediaLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<MediaLogic> _logger { get; }

        public MediaLogic(IUnitOfWork unit, ILogger<MediaLogic> logger)
        {
            _uow = unit;
            _logger = logger;
        }

        public async Task<Uploaded> UploadFile(IFormFile file)
        {
            Uploaded Uploaded = new Uploaded();
            FileLogic fileLogic = new FileLogic();
            var a = await fileLogic.UploadFile(file);

            Media media = new Media
            {
                Name = a
            };
            var rs = await this.CreateMediaAsync(media);
            return Uploaded;
        }

        public async Task<Media> CreateMediaAsync(Media mediaData)
        {
            try
            {
                _logger.LogWarning("Create Media");
                await _uow.GetRepository<Media>().AddAsync(mediaData);
                _uow.SaveChanges();
                return await Task.FromResult(mediaData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
