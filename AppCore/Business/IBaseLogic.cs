using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IBaseLogic<T> where T : class
    {
        List<T> GetAll();
    }
}
