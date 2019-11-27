using System;
using System.Collections.Generic;
using System.Text;

namespace FileService
{
    public class UploadResponse
    {
    }

    public class Uploaded
    {
        public string ContentType {get; set;}
        public string FileName {get; set;}
        public string SubName { get; set; }
        public long Length {get; set;}
        public string UrlPath  {get; set;}

        public Uploaded(string contentType, string fileName, string subName, long length, string urlPath) {
            this.ContentType = contentType;
            this.FileName = fileName;
            this.SubName = subName;
            this.Length = length;
            this.UrlPath = urlPath;
        }
    }
}
