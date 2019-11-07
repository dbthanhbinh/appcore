import RestConnection from '../apis/rest'

export function getUserList(payload, cb) {
    return new RestConnection().get(payload, cb)
}

export function addUser(payload, cb) {
    return new RestConnection().post(payload, cb)
}

export function deleteUser(payload, cb) {
    return new RestConnection().put(payload, cb)
}

export function loginUser(payload, cb) {
    return new RestConnection().post(payload, cb)
}