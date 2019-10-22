using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Controllers.commons
{
    public class BaseResponse
    {
        public string Success { get; set; } = "Success";
        public string Message { get; set; } = "";
        public object Data { get; set; }
        public int StatusCode { get; set; } = 200;
        public DateTime TimesTamp = DateTime.Now;
        public string Version = "0.1";

        public BaseResponse()
        {
            this.Data = "";
        }

        public BaseResponse(object data)
        {
            this.Data = data;
        }
        public BaseResponse(object data, string message)
        {
            this.Data = data;
            this.Message = message;
        }
    }
}
