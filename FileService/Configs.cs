using System;
using System.Collections.Generic;
using System.Text;

namespace FileService
{
    public class Configs
    {
        public const long MAX_FILE_SIZE = 10485760;
        public const long MIN_FILE_SIZE = 0;
        public const string UPLOADED = "FrontApp/public/Uploads";
        public const string NOT_FOUND_FILE = "Please select file to upload.";
        public const string FILE_TYPE_NOt_ALLOW = "The file type is not allow.";
        public const string FILE_SIZE_TOO_BIG = "The file size is too big.";
        public const string RESIZE_LAGRE_LABEL = "Lagre";
        public const string RESIZE_MEDIUM_LABEL = "Medium";
        public const string RESIZE_SMALL_LABEL = "Small";
        public static string[] ImageTypes = { ".jpg", ".png", ".gif", ".jpeg" };

        public static Int32 RESIZE_LARGE_WIDTH = 1024;
        public static Int32 RESIZE_LARGE_HEIGHT = 1024;

        public static Int32 RESIZE_MEDIUM_WIDTH = 500;
        public static Int32 RESIZE_MEDIUM_HEIGHT = 500;

        public static Int32 RESIZE_SMALL_WIDTH = 300;
        public static Int32 RESIZE_SMALL_HEIGHT = 300;

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
