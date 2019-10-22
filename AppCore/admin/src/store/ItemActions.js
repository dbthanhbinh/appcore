import Api from '../apis'

export function getProducts(payload, cb) {
    return Api.get(payload, cb)
}

export function addProducts(payload, cb) {
    return Api.post(payload, cb)
}

export function deleteProducts(payload, cb) {
    return Api.put(payload, cb)
}