using AppCore.Models.DBModel;
using System;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IObjectMediaLogic
    {
        Task<ObjectMedia> CreateObjectMediaAsync(Guid mediaCreatedId, Guid objectId, string objectType);
    }
}
