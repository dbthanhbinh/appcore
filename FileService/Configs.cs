using System;
using System.Collections.Generic;
using System.Text;

namespace FileService
{
    public class Configs
    {
        public const long MAX_FILE_SIZE = 1000;
        public const long MIN_FILE_SIZE = 0;
        public const string UPLOADED = "Uploads";
        public const string NOT_FOUND_FILE = "Please select file to upload.";
        public const string FILE_TYPE_NOt_ALLOW = "The file type is not allow.";
        public const string FILE_SIZE_TOO_BIG = "The file size is too big.";

        public static readonly IDictionary<string, string> ImageMimeDictionary = new Dictionary<string, string>
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
    }
}
