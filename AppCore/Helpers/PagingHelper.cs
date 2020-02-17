using AppCore.Controllers.commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppCore.Helpers
{
    public class PagingHelper<T> where T : class
    {
        private static int _pageSize = 5;

        public static PagingResponse GetPagingList(List<T> simCardList, int pageNumber, int pageSize)
        {
            List<T> resultPg = null;
            int totalRecords = simCardList.Count;
            if (totalRecords < 1)
            {
                return new PagingResponse(null, new BasePagingResponse(0, 0, pageNumber, _pageSize, true));
            }

            // Re-assigned pageSize
            if (pageSize > 0)
                _pageSize = pageSize;
            
            int toTalPages = totalRecords / _pageSize;
            int mode = totalRecords % _pageSize;
            if (mode > 1)
            {
                toTalPages++;
            }

            if (totalRecords < _pageSize)
            {
                return new PagingResponse(simCardList, new BasePagingResponse(toTalPages, totalRecords, pageNumber, _pageSize, true));
            }

            if (pageNumber >= 1 && pageNumber <= toTalPages)
            {
                resultPg = simCardList.Skip((pageNumber - 1) * _pageSize).Take(_pageSize).ToList();
            }

            return new PagingResponse(resultPg, new BasePagingResponse(toTalPages, totalRecords, pageNumber, _pageSize, true));
        }

        public static PagingResponse GetPagingList(List<T> resultPg, int pageNumber, int pageSize, int totalRecords)
        {
            if (totalRecords < 1)
            {
                return new PagingResponse(null, new BasePagingResponse(0, 0, pageNumber, _pageSize, true));
            }

            // Re-assigned pageSize
            if (pageSize > 0)
                _pageSize = pageSize;

            int toTalPages = totalRecords / _pageSize;
            int mode = totalRecords % _pageSize;
            if (mode > 1)
            {
                toTalPages++;
            }

            if (totalRecords < _pageSize)
            {
                return new PagingResponse(resultPg, new BasePagingResponse(toTalPages, totalRecords, pageNumber, _pageSize, true));
            }
            return new PagingResponse(resultPg, new BasePagingResponse(toTalPages, totalRecords, pageNumber, _pageSize, true));
        }
    }
}
