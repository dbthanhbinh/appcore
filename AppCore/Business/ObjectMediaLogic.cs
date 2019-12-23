﻿using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class ObjectMediaLogic : IObjectMediaLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<ObjectMediaLogic> Logger { get; }
        private readonly IMediaLogic _mediaLogic;

        public ObjectMediaLogic(IUnitOfWork uow, IMediaLogic mediaLogic, ILogger<ObjectMediaLogic> logger)
        {
            _uow = uow;
            Logger = logger;
            _mediaLogic = mediaLogic;
        }


        public async Task<ObjectMedia> CreateObjectMediaAsync(IFormFile File, Guid objectId, string objectType, string mediaType)
        {
            try
            {
                Logger.LogWarning("Create Object Media");
                // Created Media
                Task<Media> mediaCreated = _mediaLogic.CreateMediaAsync(File);
                Task.WaitAll(mediaCreated);

                ObjectMedia objectMedia = new ObjectMedia
                {
                    MediaId = mediaCreated.Result.Id,
                    ObjectId = objectId,
                    ObjectType = objectType,
                    MediaType = mediaType
                };
                await _uow.GetRepository<ObjectMedia>().AddAsync(objectMedia);
                return objectMedia;
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public Task<ObjectMedia> ObjectMediaUpdatePostBusinessAsync(IFormFile File, Guid objectId, string objectType, string mediaType)
        {
            try
            {
                Logger.LogWarning("UpdatePostBusiness Object Media");
                Task<Media> mediaCreated = _mediaLogic.CreateMediaAsync(File);
                //Task.WaitAll(mediaCreated);
                ObjectMedia objectMediaInfo = new ObjectMedia();
                if (mediaCreated.Result.Id != null && mediaCreated.Result.Name != null && mediaCreated.Result.Size > 0)
                {
                    objectMediaInfo = _uow.GetRepository<ObjectMedia>().GetByFilter(om => om.ObjectId == objectId && om.ObjectType == objectType && om.MediaType == mediaType).FirstOrDefault();
                    objectMediaInfo.MediaId = mediaCreated.Result.Id;
                    _uow.GetRepository<ObjectMedia>().Update(objectMediaInfo);
                    _uow.SaveChanges();
                }
                return Task.FromResult(objectMediaInfo);

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

    }
}
