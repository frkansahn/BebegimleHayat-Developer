const resource = '/api/v1/city'
export default ($store, $axios) => ({
    getCities() {
        return $axios.get(`${resource}/getAllCity`)
    },

    getWeatherCity(id) {
        return $axios.get(`${resource}/getWeatherCity/${id}`)
    }
})