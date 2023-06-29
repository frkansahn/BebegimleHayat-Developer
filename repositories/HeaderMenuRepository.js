const resource = '/api/v1/header_menu'
export default ($store, $axios) => ({
    getHeaderMenu() {
        return $axios.get(
            `${resource}/getHeaderMenu?language=${$store.state.customer.language}`
        )
    },

    getHeaderMenuForAdmin() {
        return $axios.get(
            `${resource}/getHeaderMenuForAdmin?language=${$store.state.language}` , { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    create(payload) {
        return $axios.post(`${resource}/add`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    update(payload) {
        return $axios.post(`${resource}/update`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    delete(payload) {
        return $axios.post(`${resource}/delete/`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updateLanguage(payload) {
        return $axios.post(`${resource}/updateLanguage`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    }
})