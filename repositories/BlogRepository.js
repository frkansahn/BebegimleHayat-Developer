const blog = '/api/v1/blog'
export default ($store, $axios) => ({

    getOtherBlogs(seo_link) {
        return $axios.get(
            `${blog}/otherBlogs/${seo_link}`
        )
    },

    getMostRead(payload) {
        return $axios.post(
            `${blog}/get_most_read` , payload
        )
    },

    getNewBlogs(payload) {
        return $axios.post(
            `${blog}/get_new_blogs` , payload
        )
    },

    getActiveAllByCategory(category_seo_link) {
        return $axios.get(
            `${blog}/active_all_by_category/${category_seo_link}`
        )
    }, 
    
    getBlogsByCategory(payload) {
        return $axios.post(
            `${blog}/get_blogs_by_category` , payload
        )
    }, 

    getAllForAdmin(payload) {
        return $axios.post(`${blog}/getAllForAdmin`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    getByIdForAdmin(id) {
        return $axios.get(`${blog}/getByIdForAdmin/${id}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    show(seo_link) {
        return $axios.get(`${blog}/${seo_link}`)
    },

    showNoSection(seo_link) {
        return $axios.get(`${blog}/noSection/${seo_link}`)
    },

    create(payload) {
        return $axios.post(`${blog}/add`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    update(id,payload) {
        return $axios.post(`${blog}/update/${id}`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    updateStatus(payload) {
        return $axios.post(`${blog}/updateStatus`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    delete(id) {
        return $axios.get(`${blog}/delete/${id}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
    },

    viewed(seo_link) {
        return $axios.get(
            `${blog}/viewed/${seo_link}`
        )
    },

    controlLink(seo_link,id) {
        return $axios.post(
            `${blog}/controlLink/${seo_link}` , {id:id} , { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
        )
    },

    getBabyName(payload) {
        return $axios.post(`${blog}/getBabyName`, payload)
    },
})