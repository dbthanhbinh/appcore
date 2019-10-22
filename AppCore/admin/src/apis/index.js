const publicUrl = 'https://localhost:5001/api/'
var Api = {
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
  
 module.exports = Api