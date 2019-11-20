const SortTypes = {
    ASC: 'asc',
    DESC: 'desc'
}

var Utils = {
    getPrice: (price) => {
        let resultPrice = null
        if(price){
            resultPrice = price
        }
        return resultPrice
    },

    getSupplier: (supplier) => {
        let resultSupplier = null
        if(supplier){
            resultSupplier = supplier
        }
        return resultSupplier
    }
}

module.exports = Utils