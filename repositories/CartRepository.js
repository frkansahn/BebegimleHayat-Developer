const resource = '/api/v1/cart'
export default ($store, $axios) => ({
    get(limit) {
        return $axios.get(
            `${resource}/getLimit/${limit}`
        )
    },

    getCartDetails(customer) {
        return $axios.get(`${resource}/getCartDetails/${customer}?language=${$store.state.customer.language}&payment_code=${$store.state.customer.payment_code}`)
    },

    add(payload) {
        return $axios.post(`${resource}/add?language=${$store.state.customer.language}`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.customer.token } })
    },

    update(payload) {
        return $axios.post(`${resource}/update?language=${$store.state.customer.language}`, payload)
    },

    delete(cart_product_id) {
        return $axios.get(`${resource}/delete/${cart_product_id}?language=${$store.state.customer.language}`)
    },

    cartUpdate(payload) {
        return $axios.post(`${resource}/cartUpdate`, payload)
    }
})