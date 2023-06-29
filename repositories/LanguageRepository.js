const resource = '/api/v1/language'
export default ($store, $axios) => ({
  getActive() {
    return $axios.get(
      `${resource}`
    )
  },
  getAll() {
    return $axios.get(
      `${resource}/all`, {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
    )
  }
})