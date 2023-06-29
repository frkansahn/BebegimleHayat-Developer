const resource = '/api/v1/brand'
export default ($store, $axios) => ({
  getAll() {
    return $axios.get(
      `${resource}/getAll`, {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
    )
  },

  getBrandByFilter(payload) {
    return $axios.post(
      `${resource}/getBrandByFilter`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
    )
  },

  get(payload) {
    return $axios.post(
      `${resource}`, payload
    )
  },

  show(id) {
    return $axios.get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.post(`${resource}/add`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
  },

  update(payload) {
    return $axios.post(`${resource}/update`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
  },

  delete(payload) {
    return $axios.post(`${resource}/delete`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
  },
})