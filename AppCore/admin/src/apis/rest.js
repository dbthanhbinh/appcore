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
        this._conf = {
            headers: this.headers, 
            credentials: 'include',
        }
        this._defaultHeaders = {
          'pragma': 'no-cache',
          'cache-control': 'no-cache'
        }
    }

    postForm = (payload, cb) => {
        if(payload && payload.url && payload.body){
            let url = publicUrl + payload.url
            let formData = new FormData()
            formData = appendFormData(payload.body)
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => {
                return response.json()
            }).then(myJson => {
                return cb(myJson)
            }).catch(error => {
                console.log('error')
            })
        }
    }
    post(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        let body = this.getBodyFromPayload(payload)
        if(url && body){
            fetch(url, {
                headers: this.headers,
                method: 'POST',
                body
            }).then(response => {
                return response.json()
            }).then(myJson => {
                return cb(myJson)
            }).catch(error => {
                console.log('error')
            })
        }
    }

    put = (payload, cb) => {
        if(payload && payload.url && payload.body){
            let url = publicUrl + payload.url
            fetch(url, {
                headers: { "Content-type": "application/json" },
                method: 'PUT',
                body: JSON.stringify(payload.body)
            }).then(response => {
                return response.json()
            }).then(myJson => {
                return cb(myJson)
            }).catch(error => {
                console.log('error')
            })
        }
    }

    get(payload, cb){
        let url = this.getPublicUrlFromPayload(payload)
        if(url){
            fetch(url).then(response => {
                return response.json()
            }).then(myJson => {
                return cb(myJson)
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
        let payloadUrl = _.get(payload, 'payload.url')
        if(payloadUrl){ publicUrl = this.publicUrl + payloadUrl }
        return publicUrl
    }

    getBodyFromPayload(payload) {
        let body = null
        let payloadBody = _.get(payload, 'payload.body')
        if(payloadBody){ body = JSON.stringify(payloadBody) }
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
}

export default RestConnection