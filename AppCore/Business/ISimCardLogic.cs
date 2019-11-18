using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface ISimCardLogic : IBaseLogic<SimCard>
    {
        void ReadExcelFile();
    }
}
