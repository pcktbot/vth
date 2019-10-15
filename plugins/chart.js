import { Bar, mixins } from 'vue-chartjs'
import DataLabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins



export default {
    extends: Bar,
    mixins: [reactiveProp],
    plugins: [DataLabels],
    props: {
        chartdata: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}

