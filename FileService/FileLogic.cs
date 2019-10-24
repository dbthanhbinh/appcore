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
        public async Task UploadFile(IFormFile file)
        {
            try
            {
                Commons common = new Commons();
                string Uploaded = common.DirectoryUpload();
                // Create Uploads folder if not exists
                common.CreateDirectoryIfNotExists();

                //1 check if the file length is greater than 0 bytes 
                if (file.Length > 0)
                {
                    if(!common.AllowMimeTypesFile())
                        throw new Exception(Configs.NOT_FOUND_FILE);
                    if (!common.CheckFileSize(file.Length))
                        throw new Exception(Configs.FILE_SIZE_TOO_BIG);

                    string fileName = common.CreateFileName(file.FileName);
                    //4 set the path where file will be copied
                    string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload()));
                    //5 copy the file to the path
                    using (var fileStream = new FileStream(Path.Combine(filePath, fileName), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
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
