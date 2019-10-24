using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FileService
{
    public class Commons
    {
        public bool AllowMimeTypesFile()
        {
            bool IsAllow = true;

            return IsAllow;
        }

        public IDictionary<string, string> GetImageMime()
        {
            return Configs.ImageMimeDictionary;
        }

        public string DirectoryUpload()
        {
            return Configs.UPLOADED;
        }

        // Create Directory if is not exists
        public void CreateDirectoryIfNotExists()
        {
            Directory.CreateDirectory(this.GetCurrentDirectoryForUpload());
        }

        public string GetCurrentDirectoryForUpload()
        {
            string FullDirectoryPath = this.GetFullDirectoryPathUpload();
            string Year = DateTime.Now.Year.ToString();
            string Month = DateTime.Now.Month.ToString();
            string Day = DateTime.Now.Day.ToString();
            return FullDirectoryPath + "\\" + Year + "\\" + Month + "\\" + Day;
        }

        public string GetCurrentDirectory()
        {
            return Directory.GetCurrentDirectory();
        }

        public string GetFullDirectoryPathUpload()
        {
            return this.GetCurrentDirectory() + "\\" + this.DirectoryUpload();
        }

        public string GetFullPathUploadFile(string FileName)
        {
            return this.GetCurrentDirectoryForUpload() + "\\" + FileName;
        }

        public string GetExtensionFileName()
        {
            return DateTime.Now.ToString("yyyyMMddHmmssff");
        }

        // Create new fileName if is Exists
        public string CreateFileName(string FileName)
        {
            if (!string.IsNullOrEmpty(FileName) && File.Exists(this.GetFullPathUploadFile(FileName)))
            {
                string OldFileName = Path.GetFileNameWithoutExtension(FileName);
                string Extension = Path.GetExtension(FileName);
                string NewFileName = OldFileName + "_" + this.GetExtensionFileName();
                FileName = NewFileName + Extension;
            }
            return FileName;
        }

        public bool CheckFileSize(long FileSize)
        {
            bool flag = false;
            if(FileSize > Configs.MIN_FILE_SIZE && FileSize < Configs.MAX_FILE_SIZE)
            {
                flag = true;
            }
            return flag;
        }
    }
}
