import { Bar, mixins } from 'vue-chartjs'
import DataLabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins

export default {
    extends: Bar,
    mixins: [reactiveProp],
    plugins: [DataLabels],
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
