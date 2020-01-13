using AppCore.Controllers.commons;
using AppCore.Models.DBModel;
using AppCore.Models.VMModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business
{
    public interface ISettingLogic
    {
        Task<Setting> UpdateSetingOptionAsync(SettingRequests settingRequests);
        Task<Setting> GetSetingOptionAsync(string settingName);
        Task<LayoutSettingsVM> GetLayoutSettingsAsync();
    }
}
