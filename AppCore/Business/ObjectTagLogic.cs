﻿using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class ObjectTagLogic : IObjectTagLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<ObjectTagLogic> _logger { get; }

        public ObjectTagLogic(IUnitOfWork uow, ILogger<ObjectTagLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        public List<ObjectTag> GetObjectTagsFilterByObjectId(Guid objectId)
        {
            try
            {
                List<ObjectTag> objectTags = new List<ObjectTag>();
                if (objectId != null)
                {
                    objectTags = _uow.GetRepository<ObjectTag>().GetByFilter(x => x.ObjectId == objectId);
                }
                return objectTags;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public async Task<List<ObjectTag>> CreateObjectTagsAsync(List<Guid> listTags, Guid objectId, string objectType)
        {
            try
            {
                _logger.LogWarning("Create Object Tag");
                List<ObjectTag> objectTags = new List<ObjectTag>();
                foreach (var tagId in listTags)
                {
                    ObjectTag objectTag = new ObjectTag
                    {
                        TagId = tagId,
                        ObjectId = objectId,
                        ObjectType = objectType
                    };
                    objectTags.Add(objectTag);
                }

                _uow.GetRepository<ObjectTag>().AddAsync(objectTags);
                _uow.SaveChanges();
                return await Task.FromResult(objectTags);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        // Get tag list Many to Many
        public List<ObjectTag> GetObjectTagsManyToManyAsync(List<Guid> listTags, Guid objectId, string objectType)
        {
            try
            {
                _logger.LogWarning("Create Object Tag");
                List<ObjectTag> objectTags = new List<ObjectTag>();
                foreach (var tagId in listTags)
                {
                    ObjectTag objectTag = new ObjectTag
                    {
                        TagId = tagId,
                        ObjectId = objectId,
                        ObjectType = objectType
                    };
                    objectTags.Add(objectTag);
                }

                return objectTags;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public void DeleteListObjectTagsBusinessAsync(List<Guid> listTags, Guid objectId, string objectType)
        {
            try
            {
                if(listTags.Count() > 0)
                {
                    List<ObjectTag> objectTags = new List<ObjectTag>();
                    foreach(Guid objectTagId in listTags)
                    {
                        ObjectTag objectTag = _uow.GetRepository<ObjectTag>().Get(objectTagId);
                        objectTags.Add(objectTag);
                    }

                    if (objectTags.Count() > 0)
                    {
                        _uow.GetRepository<ObjectTag>().DeleteRange(objectTags);
                        _uow.SaveChanges();
                    }   
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public void CreateListObjectTagsBusinessAsync(List<Guid> listTags, Guid objectId, string objectType)
        {
            try
            {
                if (listTags.Count() > 0)
                {
                    List<ObjectTag> objectTags = new List<ObjectTag>();
                    foreach (Guid guid in listTags)
                    {
                        ObjectTag objectTag = new ObjectTag
                        {
                            TagId = guid,
                            ObjectId = objectId,
                            ObjectType = objectType
                        };
                        objectTags.Add(objectTag);
                    }

                    if (objectTags.Count() > 0)
                    {
                        _uow.GetRepository<ObjectTag>().AddRange(objectTags);
                        _uow.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public void UpdateObjectTagsBusinessAsync(string listTags, string listHiddenTags, Guid objectId, string objectType, out List<ObjectTag> objectTags)
        {
            try
            {
                objectTags = null;
                _logger.LogWarning("UpdateObjectTagsBusinessAsync");

                List<Guid> tagListHiddens = new List<Guid>();
                List<Guid> tagListIds = new List<Guid>();
                List<ObjectTagItem> listAllTagsNew = new List<ObjectTagItem>();

                if (!string.IsNullOrEmpty(listTags))
                {   
                    if (!string.IsNullOrEmpty(listHiddenTags))
                    {
                        tagListHiddens = listHiddenTags.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    }

                    tagListIds = listTags.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    if (!tagListIds.Equals(tagListHiddens))
                    {
                        List<ObjectTag> objectTagsInfo = _uow.GetRepository<ObjectTag>().GetByFilter(x => tagListHiddens.Contains(x.TagId) && x.ObjectId == objectId).ToList();

                        ObjectListTagsInitial objectListTagsInitialOld = new ObjectListTagsInitial(tagListHiddens, "Delete");
                        ObjectListTagsInitial objectListTagsInitialNew = new ObjectListTagsInitial(tagListIds, "New");

                        List<ObjectTagItem> listAllTags = objectListTagsInitialOld.ListAllTags.Concat(objectListTagsInitialNew.ListAllTags).Distinct().ToList();

                        foreach (ObjectTagItem objectTagItem in listAllTags)
                        {
                            if (tagListHiddens.Contains(objectTagItem.TagId) && tagListIds.Contains(objectTagItem.TagId))
                            {
                                objectTagItem.IsActive = "Skip";
                                listAllTagsNew.Add(objectTagItem);
                            }
                            else if(tagListHiddens.Contains(objectTagItem.TagId) && !tagListIds.Contains(objectTagItem.TagId))
                            {
                                ObjectTag objectTagInfo = objectTagsInfo.Find(x => x.TagId == objectTagItem.TagId);
                                objectTagItem.Id = objectTagInfo.Id;
                                objectTagItem.IsActive = "Delete";
                                listAllTagsNew.Add(objectTagItem);
                            }
                            else
                            {
                                listAllTagsNew.Add(objectTagItem);
                            }
                        }

                        // Remove old ObjectTag
                        List<Guid> toDeleteIds = listAllTagsNew.FindAll(f => f.IsActive == "Delete").Select(s => s.Id).ToList();
                        this.DeleteListObjectTagsBusinessAsync(toDeleteIds, objectId, objectType);

                        // Create new ObjectTag
                        List<Guid> toAddNewIds = listAllTagsNew.FindAll(f => f.IsActive == "New").Select(s => s.TagId).ToList();
                        // this.CreateListObjectTagsBusinessAsync(toAddNewIds, objectId, objectType);

                        objectTags = this.GetObjectTagsManyToManyAsync(toAddNewIds, objectId, objectType);
                    }
                }

                //return Task.FromResult(listAllTagsNew);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        // Update object tags Many to Many
        public Task<List<ObjectTagItem>> GetUpdateObjectTagsBusinessAsync(string listTags, string listHiddenTags, Guid objectId, string objectType)
        {
            try
            {
                _logger.LogWarning("UpdateObjectTagsBusinessAsync");

                List<Guid> tagListHiddens = new List<Guid>();
                List<Guid> tagListIds = new List<Guid>();
                List<ObjectTagItem> listAllTagsNew = new List<ObjectTagItem>();

                if (!string.IsNullOrEmpty(listTags))
                {
                    if (!string.IsNullOrEmpty(listHiddenTags))
                    {
                        tagListHiddens = listHiddenTags.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    }

                    tagListIds = listTags.ToString().Split(",").Select(x => Guid.Parse(x)).ToList();
                    if (!tagListIds.Equals(tagListHiddens))
                    {
                        List<ObjectTag> objectTagsInfo = _uow.GetRepository<ObjectTag>().GetByFilter(x => tagListHiddens.Contains(x.TagId) && x.ObjectId == objectId).ToList();

                        ObjectListTagsInitial objectListTagsInitialOld = new ObjectListTagsInitial(tagListHiddens, "Delete");
                        ObjectListTagsInitial objectListTagsInitialNew = new ObjectListTagsInitial(tagListIds, "New");

                        List<ObjectTagItem> listAllTags = objectListTagsInitialOld.ListAllTags.Concat(objectListTagsInitialNew.ListAllTags).Distinct().ToList();

                        foreach (ObjectTagItem objectTagItem in listAllTags)
                        {
                            if (tagListHiddens.Contains(objectTagItem.TagId) && tagListIds.Contains(objectTagItem.TagId))
                            {
                                objectTagItem.IsActive = "Skip";
                                listAllTagsNew.Add(objectTagItem);
                            }
                            else if (tagListHiddens.Contains(objectTagItem.TagId) && !tagListIds.Contains(objectTagItem.TagId))
                            {
                                ObjectTag objectTagInfo = objectTagsInfo.Find(x => x.TagId == objectTagItem.TagId);
                                objectTagItem.Id = objectTagInfo.Id;
                                objectTagItem.IsActive = "Delete";
                                listAllTagsNew.Add(objectTagItem);
                            }
                            else
                            {
                                listAllTagsNew.Add(objectTagItem);
                            }
                        }

                        // Remove old ObjectTag
                        List<Guid> toDeleteIds = listAllTagsNew.FindAll(f => f.IsActive == "Delete").Select(s => s.Id).ToList();
                        this.DeleteListObjectTagsBusinessAsync(toDeleteIds, objectId, objectType);

                        // Create new ObjectTag
                        List<Guid> toAddNewIds = listAllTagsNew.FindAll(f => f.IsActive == "New").Select(s => s.TagId).ToList();
                        this.CreateListObjectTagsBusinessAsync(toAddNewIds, objectId, objectType);
                    }
                }

                return Task.FromResult(listAllTagsNew);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }


    }
}
