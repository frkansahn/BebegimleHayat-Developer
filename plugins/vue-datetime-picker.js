import Vue from "vue";
import { FunctionalCalendar } from 'vue-functional-calendar';

Vue.component('FunctionalCalendar', FunctionalCalendar);

Vue.use(FunctionalCalendar, {
    dayNames: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
});