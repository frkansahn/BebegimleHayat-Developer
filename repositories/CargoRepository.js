const resource = '/api/v1/cargo'
export default ($store, $axios) => ({
    getCargo() {
        return $axios.get(`${resource}/getCargo`, { headers: { 'Authorization': 'Bearer ' + $store.state.customer.token } })
    },

    changeCargo(cargoId) {
        if(cargoId)
            return $axios.get(`${resource}/changeCargo/${cargoId}`, { headers: { 'Authorization': 'Bearer ' + $store.state.customer.token } })
        else 
            return false
    }
})