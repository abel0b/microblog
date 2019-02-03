const apiRoot = (process.env.NODE_ENV === 'production')? 'http://microblog.adnt.fr' : 'http://localhost:8080'

const api = {
    get(path) {
        return this.call('GET', path)
    },
    patch(path, body) {
        return this.call('PATCH', path, body)
    },
    post(path, body) {
        return this.call('POST', path, body)
    },
    async call(method, path, body) {
        let response
        let headers = {}
        if (body) {
            headers['Accept'] = 'application/json'
            headers['Content-Type'] = 'application/json'
        }
        headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        try {
            response = await fetch(apiRoot + path, {
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            })
        }
        catch (e) {
            console.log("error", e)
        }
        return response
    }
}

export default api
