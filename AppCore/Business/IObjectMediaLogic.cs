using AppCore.Models.DBModel;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IObjectMediaLogic
    {
        Task<ObjectMedia> CreateObjectMediaAsync(long mediaCreatedId, long objectId, string objectType);
    }
}
