import Vue from 'vue'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import VueMask from 'v-mask'
import { VueMaskDirective } from 'v-mask'

Vue.use(VueMask);
Vue.directive('mask', VueMaskDirective);
Vue.component('VuePhoneNumberInput', VuePhoneNumberInput)