const resource = '/api/v1/contact_application'
export default ($store, $axios) => ({
    getAll() {
        return $axios.get(`${resource}/getAllMessages`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    create(payload) {
        return $axios.post(`${resource}/add`, payload)
    },

    update(payload) {
        return $axios.post(`${resource}/update`, payload)
    },

    delete(payload) {
        return $axios.post(`${resource}/delete`, payload)
    },
})