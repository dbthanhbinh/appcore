using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using FileService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class MediaLogic : IMediaLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<MediaLogic> _logger { get; }

        public MediaLogic(IUnitOfWork uow, ILogger<MediaLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        public Uploaded UploadFile(IFormFile file)
        {
            _logger.LogWarning("Begin upload file");
            Uploaded uploaded = null;
            FileLogic fileLogic = new FileLogic();
            uploaded = fileLogic.UploadFile(file);
            return uploaded;
        }

        public async Task<Media> CreateMediaAsync(IFormFile file)
        {
            try
            {
                Uploaded uploaded = this.UploadFile(file);
                _logger.LogWarning("Begin create media");
                Media media = new Media();
                if (uploaded != null)
                {
                    media.Name = uploaded.FileName;
                    media.Path = uploaded.UrlPath;
                    media.Size = uploaded.Length;
                    media.Type = uploaded.ContentType;
                }
                await _uow.GetRepository<Media>().AddAsync(media);
                return media;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public Task<Media> CreateMedia()
        {
            try
            {
                Media mediaData = new Media();
                mediaData.Name = "Name 11";
                _logger.LogWarning("Create Media");
                _uow.GetRepository<Media>().AddAsync(mediaData);
                _uow.SaveChanges();
                return Task.FromResult(mediaData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
