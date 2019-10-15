<template>
  <v-container
    class="fill-height"
    fluid
    >
        <v-row
        align="center"
        justify="center"
        >
                
            <div class="text-center">
                 <v-card 
                    class="default-card"
                >
                  <h2>Welcome to Voluntracker!</h2>
                  <p>Better name to come...</p>
                  <br><br>
                  <p>With this nifty app, you can start to track volunteer hours for all our great volunteers at G5!</p>
                 </v-card>
            </div>
        </v-row>
  </v-container>
</template>


<script>
import {fireDb} from '~/plugins/firebase.js'

export default {
  data() {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      userNames: []
    }
  },
  methods: {
    async writeToFirestore() {
      const ref = fireDb.collection("users").add({
        name: "mary",
        email: "mary@gmail.com"
      })
      this.writeSuccessful = true
    },
    readFromFirestore() {
        fireDb.collection('users').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.userNames.push = (doc.id, '=>', doc.data().name)
              console.log(doc.id, '=>', doc.data())
            })
            this.readSuccessful = true
          })
          .catch((err) => {
            console.log('Error getting documents', err)
          })
      }
    }
  }
</script>

<style>
  body {
    background: #333;
  }
  .default-card {
    padding: 2em;
    margin: 3em;
  }
</style>
