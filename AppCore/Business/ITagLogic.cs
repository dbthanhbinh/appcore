using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppCore.Controllers.commons;

namespace AppCore.Business
{
    public interface ITagLogic
    {
        List<Tag> GetAll();
        Task<Tag> CreateTagAsync(ReqCreateTag reqData);
    }
}
