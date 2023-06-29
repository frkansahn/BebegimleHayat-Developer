const content = '/api/v1/contents'
const contents_category = '/api/v1/contents_category'
export default ($store, $axios) => ({
    getContentsCategoryByType(type) {
        return $axios.get(
            `${contents_category}/getByType/${type}`
        )
    },

    getContentByCode(code) {
        return $axios.get(
            `${content}/getContentByCode/${code}`
        )
    },

    getContentsBySeoLink(seo_link) {
        return $axios.get(
            `${content}/getContentsBySeoLink/${seo_link}`
        )
    },

    getAllContent(category) {
        return $axios.get(
            `${content}/all/` , { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    getAllContentCategory() {
        return $axios.get(
            `${contents_category}/all` , { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    getByIdForAdmin(id) {
        return $axios.get(`${content}/ForAdmin/${id}` , { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    show(seo_link) {
        return $axios.get(`${content}/${seo_link}`)
    },

    create(payload) {
        return $axios.post(`${content}/add`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    update(payload) {
        return $axios.post(`${content}/update`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    delete(payload) {
        return $axios.post(`${content}/delete`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    controlLink(seo_link,id) {
        return $axios.post(
            `${content}/controlLink/${seo_link}` , {id:id} , { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },
})