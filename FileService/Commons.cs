using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FileService
{
    public class Commons
    {
        // Check allow file types
        public bool AllowMimeTypesFile()
        {
            bool IsAllow = true;
            return IsAllow;
        }

        // Allow file type config
        public IDictionary<string, string> GetImageMime()
        {
            return Configs.ImageMimeDictionary;
        }

        // Get Uploaded folder
        public string DirectoryUploaded()
        {
            return Configs.UPLOADED;
        }

        // Create Directory if is not exists
        public void CreateDirectoryIfNotExists(string SubPathDirectory)
        {
            Directory.CreateDirectory(this.GetCurrentDirectoryForUpload(SubPathDirectory));
        }

        public string GetCurrentDirectoryForUpload(string SubPathDirectory)
        {
            string FullDirectoryPath = this.GetFullDirectoryPathUpload();
            return FullDirectoryPath + SubPathDirectory;
        }

        public string GetCurrentDirectory()
        {
            return Directory.GetCurrentDirectory();
        }

        public string GetFullDirectoryPathUpload()
        {
            return this.GetCurrentDirectory() + "\\" + this.DirectoryUploaded();
        }

        public string GetFullPathUploadFile(string SubPathDirectory, string FileName)
        {
            return this.GetCurrentDirectoryForUpload(SubPathDirectory) + "\\" + FileName;
        }

        public string GetExtensionFileName()
        {
            return DateTime.Now.ToString("yyyyMMddHmmssff");
        }

        // Create new fileName if is Exists
        public string CreateFileName(string SubPathDirectory, string FileName)
        {
            if (!string.IsNullOrEmpty(FileName) && File.Exists(this.GetFullPathUploadFile(SubPathDirectory, FileName)))
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
