import RestConnection from '../apis/rest'

export function getItemList(payload, cb) {
    return new RestConnection().get(payload, cb)
}

export function addItem(payload, cb) {
    //return RestConnection.postForm(payload, cb)
}

export function deleteItem(payload, cb) {
    //return RestConnection.put(payload, cb)
}

export function addCategory(payload, cb) {
    //return RestConnection.post(payload, cb)
}