const customer = '/api/v1/customer';
const customerToken = '/api/v1/customerToken';
const country = '/api/v1/country';
const state = '/api/v1/state';
const city = '/api/v1/city';
export default ($store, $axios , env) => ({
    get() {
        return $axios.get(`${customer}/getCustomer` , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    me() {
        return $axios.get(`${customerToken}/me` , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    token(payload) {
        return $axios.post(`${customerToken}/` , payload)
    },

    cartGuestToCustomer(payload) {
        return $axios.post(`${customerToken}/cartGuestToCustomer` , payload)
    },

    loginFacebook() {
        window.location.href = `${env.baseUrl}${customerToken}/login/facebook`;
    },

    loginGoogle() {
        window.location.href = `${env.baseUrl}${customerToken}/login/google`;
    },

    loginGoogleControl() {
        return $axios.get(`${customerToken}/login/google/control`)
    },

    show(id) {
        return $axios.get(`${customer}/${id}`)
    },

    create(payload) {
        return $axios.post(`${customer}/add`, payload)
    },

    update(payload) {
        return $axios.post(`${customer}/update`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    changePassword(payload) {
        return $axios.post(`${customer}/changePassword`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    forgotPassword(payload) {
        return $axios.post(`${customer}/forgotPassword`, payload)
    },

    forgotPasswordcontrolRefreshToken(payload) {
        return $axios.post(`${customer}/forgotPasswordcontrolRefreshToken`, payload)
    },

    forgotPasswordChangePassword(payload) {
        return $axios.post(`${customer}/forgotPasswordChangePassword`, payload)
    },

    getCustomerFavorites(payload) {
        return $axios.post(`${customer}/getCustomerFavorites?language=${$store.state.customer.language}` , payload , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    addCustomerFavorite(product_id) {
        return $axios.get(`${customer}/addCustomerFavorite/${product_id}` , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    deleteCustomerFavorite(product_id) {
        return $axios.get(`${customer}/deleteCustomerFavorite/${product_id}` , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    getCustomerAddress() {
        return $axios.get(`${customer}/getCustomerAddress`, {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    addAddress(address) {
        return $axios.post(`${customer}/addCustomerAddress`, {address: address} , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    updateAddress(address) {
        return $axios.post(`${customer}/updateCustomerAddress`, {address: address} , {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    deleteAddress(address) {
        return $axios.post(`${customer}/deleteCustomerAddress`, {address: address}, {headers: { 'Authorization': 'Bearer ' + $store.state.customer.token}})
    },

    getCountries() {
        return $axios.get(`${country}/`)
    },

    getStates(country_id) {
        return $axios.get(`${state}/getStatesByCountryId/${country_id}`)
    },

    getCities(state_id) {
        return $axios.get(`${city}/getCitiesByStateId/${state_id}`)
    },

    addEmailSubscription(payload) {
        return $axios.post(`${customer}/addEmailSubscription`, payload)
    },
})