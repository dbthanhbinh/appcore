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

        public async Task<Seo> GetSeoBySlug(string slug)
        {
            Seo seoVM = new Seo();
            try
            {
                IEnumerable<Seo> enumerable = _uow.GetRepository<Seo>().Get((x) => x.Slug == slug);
                seoVM = enumerable.FirstOrDefault();
                return await Task.FromResult(seoVM);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public Task<Seo> UpdateSeoAsync(ReqUpdateSeo seoData)
        {
            try
            {
                Seo seoObj = new Seo();
                if (seoData != null)
                {
                    seoObj = _uow.GetRepository<Seo>().GetByFilter((x) => x.ObjectId == seoData.ObjectId).FirstOrDefault();
                    seoObj.SeoTitle = seoData.SeoTitle;
                    seoObj.SeoDescription = seoData.SeoDescription;
                    seoObj.SeoKeys = seoData.SeoKeys;

                    _uow.GetRepository<Seo>().Update(seoObj);
                    _uow.SaveChanges();
                }
                return Task.FromResult(seoObj);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
