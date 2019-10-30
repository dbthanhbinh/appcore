import { appendFormData } from '../components/form/FormUtils'
const publicUrl = 'http://localhost:50453/api/'

var Api = {
    postForm: (payload, cb) => {
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
    },
    post: (payload, cb) => {
        if(payload && payload.url && payload.body){
            let url = publicUrl + payload.url
            fetch(url, {
                headers: { "Content-type": "application/json" },
                method: 'POST',
                body: JSON.stringify(payload.body)
            }).then(response => {
                return response.json()
            }).then(myJson => {
                return cb(myJson)
            }).catch(error => {
                console.log('error')
            })
        }
    },
    put: (payload, cb) => {
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
    },
    get: (payload, cb) => {
        if(payload && payload.url && payload.body){
            let url = publicUrl + payload.url
            fetch(url).then(response => {
                return response.json()
            }).then(myJson => {
                return cb(myJson)
            }).catch(error => {
                console.log('error')
            })
        }
    }
}

export default Api