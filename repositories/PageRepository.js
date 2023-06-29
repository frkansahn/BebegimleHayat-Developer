const resource = '/api/v1/page'
export default ($store, $axios) => ({
    getTypeBySeoLink(seoLink) {
        return $axios.get(`${resource}/getTypeBySeoLink/${seoLink}`)
    }
})