const resource = '/api/v1/payment'
export default ($store, $axios) => ({
    getPaymentType() {
        return $axios.get(`${resource}/getPaymentType`)
    },

    payCreditCard(payload) {
        return $axios.post(`${resource}/payCreditCard?payment_code=${$store.state.customer.payment_code}` , payload , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    payWireTransfer(selected_account) {
        return $axios.post(`${resource}/payWireTransfer?selected_account=${selected_account}` , {} , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    payDoor(door_payment_type) {
        return $axios.post(`${resource}/payDoor?door_payment_type=${door_payment_type}` , {} , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    payZainCash() {
        return $axios.post(`${resource}/payZainCash?language=${$store.state.customer.language}` , {} , {headers: {'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    iyzicoQueryInstallmentAndBin(payload) {
        return $axios.post(`${resource}/iyzicoQueryInstallmentAndBin` , payload , {headers: {'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + $store.state.customer.token}})
    }
})