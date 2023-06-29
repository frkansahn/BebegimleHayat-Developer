const resource = '/api/v1/category'
export default ($store, $axios) => ({
  get() {
    return $axios.get(
      `${resource}?language=${$store.state.customer.language}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
    )
  },

  getCategoryByLanguage(id, language) {
    return $axios.get(
      `${resource}/getCategoryByLanguage/${id}/${language}`, { headers: { 'Authorization': 'Bearer ' + $store.state.token } }
    )
  },

  getCategoryTree() {
    return $axios.get(
      `${resource}/getCategoryTree?language=${$store.state.customer.language}`
    )
  },

  getBySeoLink(seo_link) {
    return $axios.get(`${resource}/getBySeoLink/${seo_link}`)
  },
  
  show(id) {
    return $axios.get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.post(`${resource}/add`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
  },

  update(id, payload) {
    return $axios.post(`${resource}/update/${id}`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
  },

  updateLanguage(payload) {
    return $axios.post(`${resource}/updateLanguage`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
  },

  delete(id, payload) {
    return $axios.post(`${resource}/delete/${id}`, payload, { headers: { 'Authorization': 'Bearer ' + $store.state.token } })
  },
})