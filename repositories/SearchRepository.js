const search = '/api/v1/search'
export default ($store, $axios) => ({
    getSearch(text) {
        return $axios.get(
            `${search}/${text}`
        )
    }
})