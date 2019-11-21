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
        public object Paging { get; set; } = null;
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

        public BaseResponse(object data, object paging)
        {
            this.Data = data;
            this.Paging = paging;
        }

        public BaseResponse(object data, string message)
        {
            this.Data = data;
            this.Message = message;
        }

        public BaseResponse(object data, string message, object paging)
        {
            this.Data = data;
            this.Message = message;
            this.Paging = paging;
        }
    }

    public class BasePagingResponse
    {
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public bool IsPaging { get; set; }

        public BasePagingResponse(int totalPages, int currentPage, int pageSize, bool isPaging)
        {
            this.TotalPages = totalPages;
            this.CurrentPage = currentPage;
            this.PageSize = pageSize;
            this.IsPaging = isPaging;
        }
    }

    public class PagingResponse : BaseResponse
    {
        public BasePagingResponse Paging { get; set; }

        public PagingResponse(object data, BasePagingResponse paging)
        {
            this.Paging = paging;
            this.Data = data;
        }
    }
}
