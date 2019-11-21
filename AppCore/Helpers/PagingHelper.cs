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
            if (simCardList.Count < 1)
            {
                return new PagingResponse(null, new BasePagingResponse(0, pageNumber, _pageSize, true));
            }

            // Re-assigned pageSize
            if (pageSize > 0)
                _pageSize = pageSize;

            int toTalPages = simCardList.Count / _pageSize;
            int mode = simCardList.Count % _pageSize;
            if (mode > 1)
            {
                toTalPages++;
            }

            if (simCardList.Count < _pageSize)
            {
                return new PagingResponse(simCardList, new BasePagingResponse(toTalPages, pageNumber, _pageSize, true));
            }

            if (pageNumber >= 1 && pageNumber <= toTalPages)
            {
                resultPg = simCardList.Skip((pageNumber - 1) * _pageSize).Take(_pageSize).ToList();
            }

            return new PagingResponse(resultPg, new BasePagingResponse(toTalPages, pageNumber, _pageSize, true));
        }
    }
}
