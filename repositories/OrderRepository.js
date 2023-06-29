const resource = '/api/v1/order'
export default ($store, $axios) => ({
    getOrderInfo(payload) {
        return $axios.post(`${resource}/getOrderInfo`,payload, {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    getOrders(payload) {
        return $axios.post(`${resource}/getOrders`,payload, {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    getOrder(order_id) {
        return $axios.get(`${resource}/getOrder/${order_id}`, {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    getOrderDetail(order_id) {
        return $axios.get(`${resource}/getOrderDetail/${order_id}`, {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    getOrderByCustomer() {
        return $axios.get(`${resource}/getOrderByCustomer`, {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    getOrderStatusList() {
        return $axios.get(`${resource}/getOrderStatusList`, {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    changeOrderStatus(payload) {
        return $axios.post(`${resource}/changeOrderStatus`, payload, {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
    },

    contorOrderAddress() {
        return $axios.get(`${resource}/contorOrderAddress`, {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },
})