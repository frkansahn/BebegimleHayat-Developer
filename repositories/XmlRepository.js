const resource = '/api/v1/xml'
export default ($store, $axios) => ({
    get(payload) {
        return $axios.post(`${resource}`, payload, {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    create(payload) {
        return $axios.post(`${resource}/createXmlProductFile`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    delete(id, payload) {
        return $axios.post(`${resource}/delete/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    }
})