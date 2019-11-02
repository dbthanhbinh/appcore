import Api from '../apis'

export function getItemList(payload, cb) {
    return Api.get(payload, cb)
}

export function addItem(payload, cb) {
    return Api.postForm(payload, cb)
}

export function deleteItem(payload, cb) {
    return Api.put(payload, cb)
}

export function addCategory(payload, cb) {
    return Api.post(payload, cb)
}