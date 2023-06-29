const resource = '/api/v1/image'
export default ($store, $axios) => ({
  upload(payload) {
    return $axios.post(`${resource}/upload`, payload , {'headers': { 'Authorization': 'Bearer ' + $store.state.token}})
  },

  uploads(payload) {
    return $axios.post(`${resource}/uploads`, payload , {'headers': { 'Authorization': 'Bearer ' + $store.state.token}})
  },

  uploadProductImages(payload) {
    return $axios.post(`${resource}/uploadProductImage`, payload ,  {'headers': { 'Authorization': 'Bearer ' + $store.state.token}})
  },

  delete(payload) {
    return $axios.post(`${resource}/removeFile`, payload , {'headers': { 'Authorization': 'Bearer ' + $store.state.token}})
  }
})