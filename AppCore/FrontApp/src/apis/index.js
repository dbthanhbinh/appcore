import RestConnection from './rest'
class ApiModule{
    constructor () {
        this.rest = new RestConnection()
    }

    apiError (code, msg, data) {
        const error = new Error(code)
        error.code = code
        error.msg = msg
        error.data = data
        return error
    }

    emit (name, result) {
        this._event.emit(name, result)
    }

    on (name, cb) {
        this._event.on(name, cb)
    }

    post(){}
    put(){}

    get(payload, cb){
        return this.rest.get(payload, cb)
    }
}

export default ApiModule