const SortTypes = {
    ASC: 'asc',
    DESC: 'desc'
}

var Utils = {
    getDefaultConfigRequestFilter: () => {
        return {
            Supplier: null,
            MinPrice: 0,
            MaxPrice: 0,
            CurrentPage: 1,
            PageSize: 5,
            FirstNumbers: null,
            EndNumbers: null,
            ExceptNumbers: []
        }
    },

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
    },

    getSupplierData: () => {
        return ["Viettel", "MobiFone", "Vinaphone", "Gmobile"]
    },

    getActiveSupplier: (key, defaultSupplier) => {
        if(key && defaultSupplier) {
            return (key === defaultSupplier) ? 'active' : ''
        }

        return ''
    }
}

module.exports = Utils