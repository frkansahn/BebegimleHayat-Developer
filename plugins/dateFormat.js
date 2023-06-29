import Vue from 'vue'
const moment = require('moment')
require('moment/locale/tr')
 
Vue.use(require('vue-moment'), {
    moment
})

Vue.filter('dateFormat', function (value) {
    if (!value) return ''

    return new Date(value).toLocaleDateString();
})

Vue.filter('dateTimeFormat', function (value) {
    if (!value) return ''

    return new Date(value).toLocaleString();
})

Vue.filter('timeFormat', function (value) {
    if (!value) return ''

    return new Date(value).toLocaleTimeString();
})