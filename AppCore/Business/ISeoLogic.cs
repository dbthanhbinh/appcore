using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface ISeoLogic
    {
        Task<Seo> CreateSeoAsync(Seo seo);
        Task<Seo> DeleteSeoAsync(ReqDeleteSeo reqDelete);
        Task<Seo> DeleteSeoWithObjectIdAsync(Guid objectId);
        Task<Seo> GetSeoBySlug(string slug);
    }
}
