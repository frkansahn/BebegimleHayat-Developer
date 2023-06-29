const siteSetting = '/api/v1/siteSettings';
const setting = '/api/v1/settings'
export default ($store, $axios) => ({
    getSiteSettings() {
        return $axios.get(
            `${siteSetting}`
        )
    },

    getSettings() {
        return $axios.get(
            `${setting}`
        )
    },

    updateHomePageSlider1(payload) {
        return $axios.post(
            `${siteSetting}/update/home_page_slider_1` , payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
        )
    },

    updateHomePageSlider2(payload) {
        return $axios.post(
            `${siteSetting}/update/home_page_slider_2` , payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
        )
    },

    updateHomePageSlider3(payload) {
        return $axios.post(
            `${siteSetting}/update/home_page_slider_3` , payload , {headers: { 'Authorization': 'Bearer ' + $store.state.token}}
        )
    }
})