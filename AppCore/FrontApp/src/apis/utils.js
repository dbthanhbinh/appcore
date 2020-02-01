const SortTypes = {
    ASC: 'asc',
    DESC: 'desc'
}

var Utils = {
    resetPagination(){
        return {
            totalPages: 0,
            totalRecords: 0,
            currentPage: 1,
            pageSize: 10,
            isPaging: false
        }
    },
    mapPaginationValue(pagingData){
        if(pagingData){
            return {
                totalPages: pagingData.totalPages,
                totalRecords: pagingData.totalRecords,
                currentPage: pagingData.currentPage,
                pageSize: pagingData.pageSize,
                isPaging: pagingData.isPaging
            }
        }
    },
    getResListApi: (result) => {
        let resultData = null
        if(result && result.statusCode === 200 && result.success === 'Success' && result.data && result.data.postData){
            resultData = result.data.postData
        }
        return resultData
    },
    getResTaskApi: (result) => {
        let resultData = null
        if(result && result.statusCode === 200 && result.success === 'Success' && result.data && result.data.result){
            resultData = result.data.result
        }
        return resultData
    },
    getResApi: (result) => {
        let resultData = null
        if(result && result.statusCode === 200 && result.success === 'Success' && result.data){
            resultData = result.data
        }
        return resultData
    },
    getResPagingApi: (result) => {
        let resultData = null
        if(result && result.statusCode === 200 && result.success === 'Success' && result.paging){
            resultData = result.paging
        }
        return resultData
    },
    getResTaskPagingApi: (result) => {
        let data = null
        let paging = null
        if(result && result.statusCode === 200 && result.success === 'Success' && result.data){
            data = result.data
            paging = result.paging
        }
        return {data, paging}
    },
    sortList: (data, type) => {
        if(data && type && typeof type === 'string' && type.toLowerCase() === SortTypes.DESC.toLowerCase())
            return data.sort((a, b) => (a.id < b.id) ? 1 : -1)
        else
            return data
    }
}

module.exports = Utils