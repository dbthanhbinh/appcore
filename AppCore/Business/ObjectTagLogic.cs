using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class ObjectTagLogic : IObjectTagLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<ObjectTagLogic> _logger { get; }

        public ObjectTagLogic(IUnitOfWork uow, ILogger<ObjectTagLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }


        public async Task<List<ObjectTag>> CreateObjectTagsAsync(List<Guid> listTags, Guid objectId, string objectType)
        {
            try
            {
                _logger.LogWarning("Create Object Tag");
                List<ObjectTag> objectTags = new List<ObjectTag>();
                foreach (var tagId in listTags)
                {
                    ObjectTag objectTag = new ObjectTag
                    {
                        TagId = tagId,
                        ObjectId = objectId,
                        ObjectType = objectType
                    };
                    objectTags.Add(objectTag);
                }

                _uow.GetRepository<ObjectTag>().AddAsync(objectTags);
                _uow.SaveChanges();
                return objectTags;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
