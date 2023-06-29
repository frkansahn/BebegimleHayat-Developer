const property = '/api/v1/property'
export default ($store, $axios) => ({

    getAllPropertyByCategoryId(category_id) {
        return $axios.get(
            `${property}/getAllPropertyByCategoryId/${category_id}?language=${$store.state.customer.language}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    getPropertyLanguages(id) {
        return $axios.get(
            `${property}/getPropertyLanguages/${id}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    createProperty(payload) {
        return $axios.post(`${property}/add`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updateProperty(payload) {
        return $axios.post(`${property}/update`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    getAllPropertyCategory() {
        return $axios.get(
            `${property}/getAllPropertyCategory?language=${$store.state.customer.language}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    createPropertyCategory(payload) {
        return $axios.post(`${property}/addPropertyCategory`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updatePropertyCategory(payload) {
        return $axios.post(`${property}/updatePropertyCategory`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updateLanguagePropertyCategory(payload) {
        return $axios.post(`${property}/updateLanguagePropertyCategory`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updateLanguageProperty(payload) {
        return $axios.post(`${property}/updateLanguage`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    deleteProperty(payload) {
        return $axios.post(`${property}/delete`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },
})