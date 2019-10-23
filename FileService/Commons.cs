using System;
using System.Collections.Generic;
using System.IO;

namespace FileService
{
    public class Commons
    {
        private static readonly IDictionary<string, string> ImageMimeDictionary = new Dictionary<string, string>
        {
            { ".bmp", "image/bmp" },
            { ".dib", "image/bmp" },
            { ".gif", "image/gif" },
            { ".svg", "image/svg+xml" },
            { ".jpe", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".jpg", "image/jpeg" },
            { ".png", "image/png" },
            { ".pnz", "image/png" }
        };

        public bool AllowMimeTypesFile()
        {
            bool IsAllow = true;

            return IsAllow;
        }

        public string DirectoryUpload()
        {
            return "Uploads";
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

        // Create new fileName if is Exists
        public string CreateFileName(string FileName)
        {
            if (!string.IsNullOrEmpty(FileName) && File.Exists(this.GetFullPathUploadFile(FileName)))
            {
                string OldFileName = Path.GetFileNameWithoutExtension(FileName);
                string Extension = Path.GetExtension(FileName);
                string NewFileName = OldFileName + "_" + DateTime.Now.ToString("yyyyMMddHmmssff");
                FileName = NewFileName + Extension;
            }
            return FileName;
        }
    }
}
