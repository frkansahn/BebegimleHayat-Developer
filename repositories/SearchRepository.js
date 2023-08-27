const search = '/api/v1/search'
export default ($store, $axios) => ({
    getSearch(text,payload) {
        return $axios.post(
            `${search}/${text}` , payload
        )
    }
})