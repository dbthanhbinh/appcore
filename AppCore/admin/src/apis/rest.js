import { appendFormData } from '../components/form/FormUtils'
import { Cookies } from 'react-cookie'
import _ from 'lodash'


//let cookies = new Cookies()
// console.log('=====', cookies.get('MAP_cookies'))

const publicUrl = 'http://localhost:50453/api/'
class RestConnection{
    constructor (conf) {
        this.publicUrl = publicUrl
        let cookies = new Cookies()
        this.cookies = cookies.get('MAP_cookies')
        this.headers = { "Content-type": "application/json" }
        this.bearerToken = `Bearer ${(this.cookies && this.cookies.token) ? this.cookies.token : ''}`
        this._conf = {
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Accept': 'application/json',
                Authorization: this.bearerToken,
            }),
            method: 'GET' // Default get method
        }
    }

    postForm(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let body = this.getBodyFromFormPayload(payload)
        let formData = new FormData()
        formData = appendFormData(body)

        let options = this._conf
            options.headers = new Headers({
                Authorization: this.bearerToken,
            })
            options.method = 'POST'
            options.body = formData
            //delete options['headers']
        this._fetch(url, options, cb)
    }

    post(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let body = this.getBodyFromPayload(payload)
        let options = this._conf
            options.method = 'POST'
            options.body = body
        this._fetch(url, options, cb)
    }

    postNoToken(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let body = this.getBodyFromPayload(payload)
        let options = this._conf
            options.headers = new Headers({
                'Access-Control-Allow-Origin': true,
                'Content-type': 'multipart/form-data',
                'Accept': 'multipart/form-data'
            })
            options.method = 'POST'
            options.body = body
        this._fetch(url, options, cb)
    }

    delete(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let body = this.getBodyFromPayload(payload)
        let options = this._conf
            options.method = 'DELETE'
            options.body = body
        this._fetch(url, options, cb)
    }

    put(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let body = this.getBodyFromPayload(payload)

        let options = this._conf
            options.method = 'PUT'
            options.body = body
        this._fetch(url, options, cb)
    }

    get(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let options = this._conf
        this._fetch(url, options, cb)
    }


    _fetch(url, options, cb){
        if(url){
            fetch(url, options)
            .then(response => {
                return this.handleResponse(response, cb)                
            }).then(myJson => {
                return this.handleThenResponse(myJson, cb)
            }).catch(error => {
                return this.handleErrorCatched(error, cb)
            })
        } else {
            return this.handleErrorPublicUrlIsNull(cb)
        } 
    }

    // ================================
    /**
     @param {*} payload 
     let payload = {
        url: 'Post/CreatePost',
        body: { Id: id }
     }
    */
    getPublicUrlFromPayload(payload) {
        let publicUrl = null
        let payloadUrl = _.get(payload, 'url')
        if(payloadUrl){ publicUrl = this.publicUrl + payloadUrl }
        return publicUrl
    }

    getBodyFromPayload(payload) {
        let body = null
        let payloadBody = _.get(payload, 'body')
        if(payloadBody){ body = JSON.stringify(payloadBody) }
        return body
    }

    getBodyFromFormPayload(payload) {
        let body = null
        let payloadBody = _.get(payload, 'body')
        if(payloadBody){ body = payloadBody }
        return body
    }

    // Handle cb whern the public url is invalid
    handleErrorPublicUrlIsNull(cb) {
        let error = 'Error: Rest publicUrl is null!'
        console.log(error)
        return cb(error, null)
    }

    handleErrorCatched(err, cb){
        console.log(err)
        return cb(err, null)
    }

    handleResponse(response, cb){
        if(response.ok){
            return response.json()
        } else {
            return cb(response.statusText, null)
        }
    }

    handleThenResponse(myJson, cb){
        if(myJson)
            return cb(null, myJson)
        else
            return cb('Error', null)
    }
}

export default RestConnection