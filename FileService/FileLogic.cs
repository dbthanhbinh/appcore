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
        public async Task UploadFile(IFormFile file)
        {
            bool isCopied = false;
            try
            {
                Commons common = new Commons();
                string Uploaded = common.DirectoryUpload();
                // Create Uploads folder if not exists
                string CurrentDirectory = common.GetCurrentDirectory();
                common.CreateDirectoryIfNotExists();

                //1 check if the file length is greater than 0 bytes 
                if (file.Length > 0)
                {
                    string fileName = common.CreateFileName(file.FileName);

                    //3 check the file extension as png
                    if (common.AllowMimeTypesFile())
                    {
                        //4 set the path where file will be copied
                        string filePath = Path.GetFullPath(
                            Path.Combine(CurrentDirectory, Uploaded));
                        //5 copy the file to the path
                        using (var fileStream = new FileStream(
                            Path.Combine(filePath, fileName),
                                           FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                            isCopied = true;
                        }
                    }
                    else
                    {
                        throw new Exception("File must be either .png or .JPG");
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
