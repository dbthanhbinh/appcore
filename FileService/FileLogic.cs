using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace FileService
{
    public class FileLogic
    {
        // This upload one file
        public Uploaded UploadFile(IFormFile file)
        {
            try
            {
                // Get current date time
                string Year = DateTime.Now.Year.ToString();
                string Month = DateTime.Now.Month.ToString();
                string Day = DateTime.Now.Day.ToString();

                string SubPathDirectory = "\\" + Year + "\\" + Month + "\\" + Day;
                string SubPathFileUrl = Year + "/" + Month + "/" + Day + "/";

                Commons common = new Commons();
                string Uploaded = common.DirectoryUploaded();
                // Create Uploads folder if not exists
                common.CreateDirectoryIfNotExists(SubPathDirectory);

                //1 check if the file length is greater than 0 bytes 
                if (file.Length > 0)
                {
                    if(!common.AllowMimeTypesFile())
                        throw new Exception(Configs.NOT_FOUND_FILE);
                    if (!common.CheckFileSize(file.Length))
                        throw new Exception(Configs.FILE_SIZE_TOO_BIG);

                    string FileName = common.CreateFileName(SubPathDirectory, file.FileName);                    
                    //4 set the path where file will be copied
                    string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(SubPathDirectory)));
                    //5 copy the file to the path
                    using (var fileStream = new FileStream(Path.Combine(filePath, FileName), FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                    SubPathFileUrl = SubPathFileUrl + FileName;
                    Uploaded uploaded = new Uploaded(file.ContentType, FileName, file.Length, SubPathFileUrl);
                    return uploaded;
                }
                else
                {
                    throw new Exception(Configs.NOT_FOUND_FILE);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IDictionary<string, string> GetImageMime()
        {
            Commons common = new Commons();
            return common.GetImageMime();
        }
    }
}
