<template>
  <div>
    <v-card
      color="#1D1F20;"
    >
      <bar  
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
    </v-card>
  </div>
</template>


<script>
import Bar from '~/plugins/chart.js'
import {fireDb} from '~/plugins/firebase.js'

export default {
  components: {
    Bar
  },
  data() {
    return {
      loaded: false,
      hours: [],
      dates: [],
      chartdata: {
        labels: [],
        datasets: [
          {
              label: "Dataset #1",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: [],
        },
        ],
      }
    }
  },
  created: function() {
        let eventsRef = fireDb.collection('volunteer-events')
        let query = eventsRef.where('userId', '==', 'Bryce Sampson' )
        .orderBy('date').limit(12).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  
            snapshot.forEach(doc => {
                this.hours.push((doc.id, '=>', doc.data().hours))
                this.dates.push((doc.id, '=>', doc.data().date))
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
        this.chartdata.labels = this.dates
        this.chartdata.datasets[0].data = this.hours
        this.loaded = true
    }
}
</script>

<style>
  canvas {
  border: 1px dotted red;
}

.chart-container {
  position: relative;
  margin: auto;
  height: 80vh;
  width: 80vw;
}
</style>

