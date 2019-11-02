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
    }
}
