using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business.Commons
{
    public static class Constants
    {
    }

    public static class PostStatus
    {
        public static string Publish { get { return "Publish"; } }
        public static string Pedding { get { return "Pedding"; } }
        public static string Draft { get { return "Draft"; } }
    }

    public static class PostTypes
    {
        public static string Default { get { return "post"; } }
    }

    public static class GeneralSetting
    {
        public static string SettingAutoLoad { get { return "Yes"; } }
        public static string SettingType { get { return "Setting"; } }
        public static string SeoSettingName { get { return "GeneralSeoSetting"; } }

        public static string GeneralettingName { get { return "GeneralSetting"; } }
    }
}
