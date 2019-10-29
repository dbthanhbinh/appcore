import Api from '../apis'

export function getProducts(payload, cb) {
    return Api.get(payload, cb)
}

export function addProducts(payload, cb) {
    return Api.postForm(payload, cb)
}

export function deleteProducts(payload, cb) {
    return Api.put(payload, cb)
}

export function addCategory(payload, cb) {
    return Api.post(payload, cb)
}