<template>
  <v-card color="#1D1F20">
    <transition appear name="slide-fade">
      <Bar
        v-if="loaded"
        :chart-data="chartData"
        :options="options"
      />
    </transition>
  </v-card>
</template>

<script>
import Bar from '~/plugins/chart.js'
import { fireDb } from '~/plugins/firebase.js'

export default {
  components: {
    Bar
  },
  data() {
    return {
      loaded: false,
      hours: [],
      dates: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true }
          }],
          xAxes: [{
            ticks: { beginAtZero: true }
          }]
        }
      }
    }
  },
  computed: {
    chartData: {
      get() {
        return {
          labels: [],
          datasets: [
            {
              label: "Dataset #1",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: []
            }
          ]
        }
      }
    }
  },
  created() {
    let eventsRef = fireDb.collection('volunteer-events')
    let query = eventsRef
      .where('userId', '==', 'Bryce Sampson')
      .orderBy('date').limit(12).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return this.$emit('No matching documents!')
        }
        snapshot.forEach((doc) => {
          this.hours.push((doc.id, '=>', doc.data().hours))
          this.dates.push((doc.id, '=>', doc.data().date))
        })
      })
      .then(() => {
        this.chartData.labels = this.dates
        this.chartData.datasets[0].data = this.hours
        this.loaded = true
      })
      .catch(err => new Error(err))
  }
}
</script>

<style>
canvas {
  border: 1px dotted red;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.chart-container {
  position: relative;
  margin: auto;
  height: 80vh;
  width: 80vw;
}
</style>

