import RestConnection from '../apis/rest'

export function getItemList(payload, cb) {
    return new RestConnection().get(payload, cb)
}

export function addItem(payload, cb) {
    return new RestConnection().postForm(payload, cb)
}

export function deleteItem(payload, cb) {
    return new RestConnection().delete(payload, cb)
}

export function addCategory(payload, cb) {
    return new RestConnection().post(payload, cb)
}