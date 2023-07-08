/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import { Line } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement
)

Vue.component('LineChart', {
  extends: Line
})