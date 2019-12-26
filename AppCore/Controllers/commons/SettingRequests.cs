using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class SettingRequests
    {
        public SettingRequests(GeneralSettingRequests generalSettingRequests)
        {
            this.Name = generalSettingRequests.SettingName;
            this.Value = generalSettingRequests.Value;
            this.CustomValue = generalSettingRequests.CustomValue;
        }

        public string Name { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public string CustomValue { get; set; }
    }

    public class GeneralSettingRequests
    {
        public string SettingName { get; set; }
        public string Value { get; set; }
        public string CustomValue { get; set; }
    }
}
