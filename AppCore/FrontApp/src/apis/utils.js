const SortTypes = {
    ASC: 'asc',
    DESC: 'desc'
}

var Utils = {
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
    sortList: (data, type) => {
        if(data && type && typeof type === 'string' && type.toLowerCase() === SortTypes.DESC.toLowerCase())
            return data.sort((a, b) => (a.id < b.id) ? 1 : -1)
        else
            return data
    }
}

module.exports = Utils