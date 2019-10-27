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
        public long Length {get; set;}
        public string UrlPath  {get; set;}

        public Uploaded(string contentType, string fileName, long length, string urlPath) {
            this.ContentType = contentType;
            this.FileName = fileName;
            this.Length = length;
            this.UrlPath = urlPath;
        }
    }
}
