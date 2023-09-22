const names = '/api/v1/names'
export default ($store, $axios) => ({ 
    getNameBySeoLink(seo_link) {
        return $axios.get(`${names}/${seo_link}`)
    }
})