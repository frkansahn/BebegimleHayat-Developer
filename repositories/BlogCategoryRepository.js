const blog_category = '/api/v1/blog_category'
export default ($store, $axios) => ({ 
    get() {
        return $axios.get(`${blog_category}/` , { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    getBabyDistionary() {
        return $axios.get(`${blog_category}/getBabyDistionary`)
    },

    getBlogCategoriesForAdmin() {
        return $axios.get(`${blog_category}/getBlogCategoriesForAdmin` , { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    getBlogCategory() {
        return $axios.get(`${blog_category}/getBlogCategory`)
    },

    getBlogCategoryBySeoLink(seo_link) {
        return $axios.get(`${blog_category}/getBlogCategoryBySeoLink/${seo_link}`)
    },

    create(payload) {
        return $axios.post(`${blog_category}/add`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    update(payload) {
        return $axios.post(`${blog_category}/update`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    delete(payload) {
        return $axios.post(`${blog_category}/delete`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updateBabyDictionary(id,value) {
        return $axios.get(`${blog_category}/updateBabyDictionary/${id}/${value}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    controlLink(seo_link,id) {
        return $axios.post(
            `${blog_category}/controlLink/${seo_link}` , {id:id} , { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },
})