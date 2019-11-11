import RestConnection from '../apis/rest'

export function getItemList(payload, cb) {
    return new RestConnection().get(payload, cb)
}

export function deleteCategory(payload, cb) {
    return new RestConnection().delete(payload, cb)
}

export function addCategory(payload, cb) {
    return new RestConnection().post(payload, cb)
}

export function updateCategory(payload, cb) {
    return new RestConnection().post(payload, cb)
}

export function detailCategory(payload, cb) {
    return new RestConnection().get(payload, cb)
}

export function detailCategoryWithEdit(payload, cb) {
    return new RestConnection().get(payload, cb)
}