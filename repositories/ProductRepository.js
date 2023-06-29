const resource = '/api/v1/product'
export default ($store, $axios) => ({
    getActiveAllProductsByLimit(limit) {
        return $axios.post(
            `${resource}/getActiveAllProductsByLimit/${limit}?language=${$store.state.customer.language}` ,
            {
                token: $store.state.customer.token
            }
        )
    },

    getProductShowCase(showcase_id) {
        return $axios.post(
            `${resource}/getProductShowCase/${showcase_id}?language=${$store.state.customer.language}` ,
            {
                token: $store.state.customer.token
            }
        )
    },

    getSameProducts(seo_link) {
        return $axios.post(
            `${resource}/getSameProducts/${seo_link}?language=${$store.state.customer.language}` ,
            {
                token: $store.state.customer.token
            }
        )
    },
    
    getProductsForAdmin(payload) {
        return $axios.post(
            `${resource}?language=${$store.state.customer.language}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
        )
    },

    getProductByCategoryForAdmin(payload) {
        return $axios.post(
            `${resource}/getCategoryProductsForAdmin`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
        )
    },

    getProductByCategory(payload) {
        payload["token"] = $store.state.customer.token;
        return $axios.post(
            `${resource}/getCategoryProducts`, payload
        )
    },

    getProductBySeoLink(seo_link) {
        return $axios.post(
            `${resource}/getProductBySeoLink/${seo_link}?language=${$store.state.customer.language}` , {token:$store.state.customer.token}
        )
    },

    getFilters(payload) {
        return $axios.post(
            `${resource}/getFilters`, payload
        )
    },

    getProductByLanguage(id,language) {
        return $axios.get(
            `${resource}/getProductByLanguage/${id}/${language}`, {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
        )
    },

    getCurrencyList() {
        return $axios.get(
            `${resource}/getCurrencyList`
        )
    },

    updatePrice(id, payload) {
        return $axios.post(`${resource}/updatePrice/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    updateSort(id, payload) {
        return $axios.post(`${resource}/updateSort/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    getById(id) {
        return $axios.get(`${resource}/getProductById/${id}` ,  {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    create(payload) {
        return $axios.post(`${resource}/add`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    update(id, payload) {
        return $axios.post(`${resource}/update/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    updateProductImage(id, payload) {
        return $axios.post(`${resource}/updateProductImage/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    updateLanguage(payload) {
        return $axios.post(`${resource}/updateLanguage`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    delete(id, payload) {
        return $axios.post(`${resource}/delete/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    }
})