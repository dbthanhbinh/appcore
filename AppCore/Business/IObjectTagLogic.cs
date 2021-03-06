﻿using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface IObjectTagLogic
    {
        Task<List<ObjectTag>> CreateObjectTagsAsync(List<Guid> listTags, Guid objectId, string objectType);
        List<ObjectTag> GetObjectTagsFilterByObjectId(Guid objectId);
        List<ObjectTag> GetObjectTagsManyToManyAsync(List<Guid> listTags, Guid objectId, string objectType);
        void UpdateObjectTagsBusinessAsync(string listTags, string listHiddenTags, Guid objectId, string objectType, out List<ObjectTag> objectTags);
    }
}
