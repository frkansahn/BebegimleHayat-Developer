import Vue from 'vue'

Vue.prototype.$checkIsNullOrEmpty = (value) => {
    if(value === null || value === '' || value === undefined || value === 'undefined') return false;
    else return true;
}