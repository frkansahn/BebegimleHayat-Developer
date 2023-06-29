const sub_product = '/api/v1/sub_product'
const property = '/api/v1/property'
export default ($store, $axios) => ({
    getPropertyCategoryGroup(language) {
        return $axios.get(`${property}/getAllPropertyCategory?language=${language}` , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    getByProductId(product_id) {
        return $axios.get(`${sub_product}/getByProductId/${product_id}` , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },
    
    create(payload) {
        return $axios.post(`${sub_product}/add`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    update(payload) {
        return $axios.post(`${sub_product}/update`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    delete(payload) {
        return $axios.post(`${sub_product}/delete`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    }
})