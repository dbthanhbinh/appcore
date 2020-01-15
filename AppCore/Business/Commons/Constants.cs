using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Business.Commons
{
    public static class Constants
    {
    }

    public static class TimeNow
    {
        public static DateTime DateTime { get { return DateTime.Now; } }
    }

    public static class PostActive
    {
        public static bool Active { get { return true; } }
        public static bool InActive { get { return false; } }
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
        public static string[] SettingNames = { "GeneralSeoSetting", "GeneralSetting", "ContactSetting", "LayoutSetting" };
        public static string SettingAutoLoad { get { return "Yes"; } }
        public static string SettingType { get { return "GeneralSetting"; } }
        public static string SeoSettingName { get { return "GeneralSeoSetting"; } }

        public static string GeneralSettingName { get { return "GeneralSetting"; } }
    }

    public class AdminMenuItem
    {
        public string Name { get; set; }
        public string Href { get; set; } = "#";
        public string DisplayName { get; set; } = null;
        public bool Active { get; set; } = false;
    }

    public class AdminMenus
    {
        public AdminMenus()
        {
            List<AdminMenuItem> adminMenuItems = new List<AdminMenuItem>();
            adminMenuItems.Add(new AdminMenuItem { Name = "Posts", DisplayName = "Posts" });
            adminMenuItems.Add(new AdminMenuItem { Name = "Pages", DisplayName = "Pages" });
            adminMenuItems.Add(new AdminMenuItem { Name = "Tags", DisplayName = "Tags" });
            adminMenuItems.Add(new AdminMenuItem { Name = "Categories", DisplayName = "Categories" });
            adminMenuItems.Add(new AdminMenuItem { Name = "Users", DisplayName = "Users" });
            adminMenuItems.Add(new AdminMenuItem { Name = "Settings", DisplayName = "Settings" });
        }
    }

    public static class GroupRoles
    {
        public static string[] SettingNames = { "SupperAdmin", "Admin", "Editor", "Author", "Member" };
    }
}
