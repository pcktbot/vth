<template>
<div class="output">
    <v-data-table
        :headers="headers"
        :items="events"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
  export default {
    data () {
      return {
        events: [],
        headers: [
          {
            text: 'User',
            align: 'left',
            sortable: false,
            value: 'userId',
          },
          { text: 'Date', value: 'date', align: 'left'},
          { text: 'Hours', value: 'hours', align: 'left' },
        ],
      }
    },
    created: function() {
        // get usernames for v-select options
        fireDb.collection('volunteer-events').orderBy('date').get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  
            snapshot.forEach(doc => {
                this.events.push((doc.id, '=>', doc.data()))
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }
  }

</script>