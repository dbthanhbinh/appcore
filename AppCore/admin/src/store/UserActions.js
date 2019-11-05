import Api from '../apis'

export function getUserList(payload, cb) {
    return Api.get(payload, cb)
}

export function addUser(payload, cb) {
    return Api.post(payload, cb)
}

export function deleteUser(payload, cb) {
    return Api.put(payload, cb)
}

export function loginUser(payload, cb) {
    return Api.post(payload, cb)
}