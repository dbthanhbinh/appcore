const SortTypes = {
    ASC: 'asc',
    DESC: 'desc'
}

var Utils = {
    getResListApi: (result) => {
        let resultData = null
        if(result && result.statusCode === 200 && result.success === 'Success'){
            resultData = result.data.postData
        }
        return resultData
    },
    getResApi: (result) => {
        let resultData = null
        if(result && result.statusCode === 200 && result.success === 'Success'){
            resultData = result.data
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