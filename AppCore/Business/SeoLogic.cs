using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class SeoLogic : ISeoLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<SeoLogic> _logger { get; }

        public SeoLogic(IUnitOfWork uow, ILogger<SeoLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        public async Task<Seo> CreateSeoAsync(Seo seodata)
        {
            try
            {
                Seo seo = new Seo();
                if (seodata != null)
                {
                    _logger.LogWarning("Begin create seo");
                    await _uow.GetRepository<Seo>().AddAsync(seodata);
                    return seodata;
                }
                return seo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public async Task<Seo> DeleteSeoWithObjectIdAsync(Guid objectId)
        {
            try
            {
                IEnumerable<Seo> Seos = _uow.GetRepository<Seo>().Get((item) => item.ObjectId == objectId);
                Seo aFirst = new Seo();
                if (Seos != null)
                {
                    aFirst = Seos.FirstOrDefault();
                }
                
                if (aFirst != null)
                {
                    _uow.GetRepository<Seo>().Delete(aFirst.Id);
                }
                return await Task.FromResult(aFirst);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public async Task<Seo> DeleteSeoAsync(ReqDeleteSeo reqDelete)
        {
            try
            {
                var seo = new Seo
                {
                    Id = reqDelete.Id
                };
                _uow.GetRepository<Seo>().DeleteAsync(seo);
                return await Task.FromResult(seo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
