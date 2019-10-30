using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class ObjectMediaLogic : IObjectMediaLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<ObjectMediaLogic> _logger { get; }

        public ObjectMediaLogic(IUnitOfWork uow, ILogger<ObjectMediaLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }


        public async Task<ObjectMedia> CreateObjectMediaAsync(Guid mediaCreatedId, Guid objectId, string objectType)
        {
            try
            {
                _logger.LogWarning("Create Object Media");
                ObjectMedia objectMedia = new ObjectMedia
                {
                    MediaId = mediaCreatedId,
                    ObjectId = objectId,
                    ObjectType = objectType
                };
                await _uow.GetRepository<ObjectMedia>().AddAsync(objectMedia);
                return objectMedia;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
