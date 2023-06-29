const resource = '/api/v1/model'
export default ($store, $axios) => ({
  getAll() {
    return $axios.get(
      `${resource}/getAll`, {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
    )
  },

  getModelByFilter(payload) {
    return $axios.post(
      `${resource}/getModelByFilter`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
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

  update(id, payload) {
    return $axios.post(`${resource}/update/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
  },

  delete(id, payload) {
    return $axios.post(`${resource}/delete/${id}`, payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}})
  },
})