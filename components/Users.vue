<template>
<div class="output">
    <v-data-table
        :headers="headers"
        :items="users"
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
        users: [],
        headers: [
          {
            text: 'Users',
            align: 'left',
            sortable: true,
            value: 'name',
          },
          { 
            text: 'Email', 
            value: 'email', 
            align: 'left' 
            },
        ],
      }
    },
    created: function() {
        // get usernames for v-select options
        fireDb.collection('users').get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  
            snapshot.forEach(doc => {
                this.users.push((doc.id, '=>', doc.data()))
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }
  }

</script>