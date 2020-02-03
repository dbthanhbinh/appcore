using AppCore.Controllers.commons;
using AppCore.Helpers;
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
        public ILogger<MediaLogic> Logger { get; }

        public MediaLogic(IUnitOfWork uow, ILogger<MediaLogic> logger)
        {
            _uow = uow;
            Logger = logger;
        }

        public UploadedFull UploadFile(IFormFile file)
        {
            Logger.LogWarning("Begin upload file");
            FileLogic fileLogic = new FileLogic();
            UploadedFull uploaded = fileLogic.UploadFile(file);
            return uploaded;
        }

        public Task<Media> CreateMediaAsync(Guid userId, IFormFile file)
        {
            try
            {
                Media media = new Media();
                List<Media> medias = new List<Media>();
                if (file != null)
                {
                    UploadedFull uploadedRs = this.UploadFile(file);
                    Logger.LogWarning("Begin create media");
                    if (uploadedRs != null)
                    {
                        media.Name = uploadedRs.Uploaded.FileName;
                        media.SubName = uploadedRs.Uploaded.FileName;
                        media.Path = uploadedRs.Uploaded.UrlPath;
                        media.Size = uploadedRs.Uploaded.Length;
                        media.Type = uploadedRs.Uploaded.ContentType;
                        media.ResizeType = "original";
                        media.CreatedBy = userId;
                        media.ModifiedBy = userId;
                    }
                    medias.Add(media);

                    if(uploadedRs.ResizeUploaded.Count() > 0)
                    {
                        foreach (Uploaded media1 in uploadedRs.ResizeUploaded)
                        {
                            medias.Add(new Media
                            {
                                Name = media1.FileName,
                                SubName = media1.FileName,
                                Path = media1.UrlPath,
                                Size = media1.Length,
                                Type = media1.ContentType,
                                ResizeType = media1.ResizeType,
                                CreatedBy = userId,
                                ModifiedBy = userId
                            });
                        }
                    }
                    //await _uow.GetRepository<Media>().AddAsync(media);
                    _uow.GetRepository<Media>().AddRange(medias);
                    _uow.SaveChanges();
                    return Task.FromResult(media);
                }
                return Task.FromResult(media);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public Task<Media> CreateMedia()
        {
            try
            {
                Media mediaData = new Media
                {
                    Name = "Name 11"
                };
                Logger.LogWarning("Create Media");
                _uow.GetRepository<Media>().AddAsync(mediaData);
                _uow.SaveChanges();
                return Task.FromResult(mediaData);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        // Get all media
        public async Task<PagingResponse> GetAllMedia()
        {
            try
            {
                List<Media> result = _uow.GetRepository<Media>().GetAll();
                PagingResponse resultPg = PagingHelper<Media>.GetPagingList(result, 1, 5);
                await Task.FromResult(resultPg);
                return resultPg;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

    }
}
