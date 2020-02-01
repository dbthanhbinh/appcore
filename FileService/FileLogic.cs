using LazZiya.ImageResize;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace FileService
{
    public class FileLogic
    {   
        //public Uploaded UploadFile(IFormFile file)
        //{
        //    try
        //    {
        //        // Get current date time
        //        string Year = DateTime.Now.Year.ToString();
        //        string Month = DateTime.Now.Month.ToString();
        //        string Day = DateTime.Now.Day.ToString();

        //        string SubPathDirectory = "\\" + Year + "\\" + Month + "\\" + Day;
        //        string SubPathFileUrl = Year + "/" + Month + "/" + Day + "/";

        //        Commons common = new Commons();
        //        string Uploaded = common.DirectoryUploaded();
        //        // Create Uploads folder if not exists
        //        common.CreateDirectoryIfNotExists(SubPathDirectory);

        //        //1 check if the file length is greater than 0 bytes 
        //        if (file.Length > 0)
        //        {
        //            if (!common.AllowMimeTypesFile())
        //                throw new Exception(Configs.NOT_FOUND_FILE);
        //            if (!common.CheckFileSize(file.Length))
        //                throw new Exception(Configs.FILE_SIZE_TOO_BIG);
        //            string SubName = Path.GetFileNameWithoutExtension(file.FileName);
        //            string FileName = common.CreateFileName(SubPathDirectory, file.FileName);
        //            //4 set the path where file will be copied
        //            string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(SubPathDirectory)));
        //            //5 copy the file to the path
        //            using (var fileStream = new FileStream(Path.Combine(filePath, FileName), FileMode.Create))
        //            {
        //                file.CopyTo(fileStream);
        //            }
        //            SubPathFileUrl += FileName;

        //            Uploaded uploaded = new Uploaded(file.ContentType, FileName, SubName, file.Length, SubPathFileUrl);
        //            return uploaded;
        //        }
        //        else
        //        {
        //            throw new Exception(Configs.NOT_FOUND_FILE);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        // This upload one file
        public UploadedFull UploadFile(IFormFile file)
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
                    if (!common.AllowMimeTypesFile())
                        throw new Exception(Configs.NOT_FOUND_FILE);
                    if (!common.CheckFileSize(file.Length))
                        throw new Exception(Configs.FILE_SIZE_TOO_BIG);
                    string SubName = Path.GetFileNameWithoutExtension(file.FileName);
                    string FileName = common.CreateFileName(SubPathDirectory, file.FileName);                    
                    //4 set the path where file will be copied
                    string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(SubPathDirectory)));

                    //5 copy the file to the path
                    using (var fileStream = new FileStream(Path.Combine(filePath, FileName), FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    Uploaded uploaded = new Uploaded(file.ContentType, FileName, SubName, file.Length, SubPathFileUrl + FileName, "original");

                    // This process Resize image
                    UploadedFull uploadedFull = new UploadedFull
                    {
                        Uploaded = uploaded
                    };

                    if (common.CheckImageTypeForResize(file.FileName))
                    {
                        string ResizeLargeFolder = SubPathDirectory + "\\" + Configs.RESIZE_LAGRE_LABEL;
                        string ResizeMediumFolder = SubPathDirectory + "\\" + Configs.RESIZE_MEDIUM_LABEL;
                        string ResizeSmallFolder = SubPathDirectory + "\\" + Configs.RESIZE_SMALL_LABEL;

                        common.CreateDirectoryIfNotExists(ResizeLargeFolder);
                        common.CreateDirectoryIfNotExists(ResizeMediumFolder);
                        common.CreateDirectoryIfNotExists(ResizeSmallFolder);

                        using (var stream = file.OpenReadStream())
                        {
                            var uploadedImage = Image.FromStream(stream);
                            List<Uploaded> uploadeds = new List<Uploaded>();
                            // Returns Image file
                            // For Large
                            var ImgLarge = ImageResize.Scale(uploadedImage, Configs.RESIZE_LARGE_WIDTH, Configs.RESIZE_LARGE_HEIGHT);
                            string filePathLarge = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(ResizeLargeFolder)));
                            ImgLarge.SaveAs($"{filePathLarge}\\{FileName}");
                            string SubFilePathLarge = SubPathFileUrl + "/" + ResizeLargeFolder + "/"+ FileName;
                            Uploaded uploadedLarge = new Uploaded(file.ContentType, FileName, SubName, file.Length, SubFilePathLarge, "large");
                            uploadeds.Add(uploadedLarge);

                            // For Medium
                            var ImgMedium = ImageResize.Scale(uploadedImage, Configs.RESIZE_MEDIUM_WIDTH, Configs.RESIZE_MEDIUM_HEIGHT);
                            string filePathMedium = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(ResizeMediumFolder)));
                            ImgMedium.SaveAs($"{filePathMedium}\\{FileName}");
                            string SubFilePathMedium = SubPathFileUrl + "/" + ResizeMediumFolder + "/" + FileName;
                            Uploaded uploadedMedium = new Uploaded(file.ContentType, FileName, SubName, file.Length, SubFilePathMedium, "medium");
                            uploadeds.Add(uploadedMedium);

                            // For Small
                            var ImgSmall = ImageResize.Scale(uploadedImage, Configs.RESIZE_SMALL_WIDTH, Configs.RESIZE_SMALL_HEIGHT);
                            string filePathSmall = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(ResizeSmallFolder)));
                            ImgSmall.SaveAs($"{filePathSmall}\\{FileName}");
                            string SubFilePathSmall = SubPathFileUrl + "/" + ResizeSmallFolder + "/" + FileName;
                            Uploaded uploadedSmall = new Uploaded(file.ContentType, FileName, SubName, file.Length, SubFilePathSmall, "small");
                            uploadeds.Add(uploadedSmall);

                            uploadedFull.ResizeUploaded = uploadeds;
                        }
                    }
                    return uploadedFull;
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
