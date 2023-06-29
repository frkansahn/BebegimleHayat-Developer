const resource = '/api/v1/bank'
export default ($store, $axios) => ({
    getBankAccounts() {
        return $axios.get(`${resource}/getBankAccounts`)
    }
})