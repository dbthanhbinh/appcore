using AppCore.Business.Commons;
using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.UnitOfWork;
using AppCore.Models.VMModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public class SettingLogic : ISettingLogic
    {
        private readonly IUnitOfWork _uow;
        public ILogger<SettingLogic> _logger { get; }

        public SettingLogic(IUnitOfWork uow, ILogger<SettingLogic> logger)
        {
            _uow = uow;
            _logger = logger;
        }

        public Task<Setting> UpdateSetingOptionAsync(Guid userId, SettingRequests settingRequests)
        {
            try
            {
                // Update Setting
                Setting setting = new Setting();
                _logger.LogInformation("Update setting");
                if (settingRequests.Name != null)
                {
                    Setting updateSetting = _uow.GetRepository<Setting>().GetByFilter(x => x.Name == settingRequests.Name).FirstOrDefault();
                    if(updateSetting != null)
                    {
                        updateSetting.Value = settingRequests.Value;
                        updateSetting.CustomValue = settingRequests.CustomValue;
                        updateSetting.ModifiedBy = userId;

                        _uow.GetRepository<Setting>().Update(updateSetting);
                        _uow.SaveChanges();
                        return Task.FromResult(updateSetting);
                    }
                    else
                    {
                        setting.Name = settingRequests.Name;
                        setting.Value = settingRequests.Value;
                        setting.Type = settingRequests.Type;
                        setting.CustomValue = settingRequests.CustomValue;
                        setting.CreatedBy = userId;
                        setting.ModifiedBy = userId;

                        _uow.GetRepository<Setting>().Add(setting);
                        _uow.SaveChanges();
                        return Task.FromResult(setting);
                    }
                }
                return Task.FromResult(setting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }

        public Task<Setting> GetSetingOptionAsync(string settingName)
        {
            try
            {
                // Update Setting
                Setting setting = new Setting();
                _logger.LogInformation("Get option setting");
                Setting settingOption = _uow.GetRepository<Setting>().GetByFilter(x => x.Name == settingName).FirstOrDefault();
                if(settingOption != null)
                {
                    return Task.FromResult(settingOption);
                }
                return Task.FromResult(setting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }



        // ================================= Process for frontend =================================
        public LayoutSettingsVM GetLayoutSettingsAsync()
        {
            try
            {
                // Get all Settings
                LayoutSettingsVM settings = new LayoutSettingsVM();
                _logger.LogInformation("Get all option settings");
                List<ListSettingVM> settingOptions = _uow.GetRepository<Setting>()
                    .GetByFilter(x => x.IsActive == true && x.Type == GeneralSetting.SettingType.ToString())
                    .Select(s => new ListSettingVM { Name = s.Name, Value = s.Value})
                    .ToList();

                if (settingOptions != null)
                {
                    settings.ThemeInfomation = settingOptions;
                }
                return settings;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                throw ex;
            }
        }
    }
}
