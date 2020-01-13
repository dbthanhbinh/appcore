using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Models.VMModel
{
    public class SettingVM
    {
    }

    public class ListSettingVM
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }




    public class LayoutSettingsVM
    {
        public string ThemeName { get; set; } = "Default";
        public string ThemeVersion { get; set; } = "1.0";
        public object ThemeInfomation { get; set; }
    }
}
