using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface ISimCardLogic : IBaseLogic<SimCard>
    {
        void ReadExcelFile();
        Task<PagingResponse> FilterSimCardBy(ReqFilterSimCard reqFilterSimCard);
    }
}
