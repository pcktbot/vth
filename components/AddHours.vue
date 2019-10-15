<template>
    <div class="text-center">

                <v-card 
                    class="default-card"
                >

                    <h1>Add Hours</h1>
                    <p>Use the form below to add hours for a user.</p>

                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >
                    <v-select
                        v-model="select"
                        :items="users"
                        :rules="[v => !!v || 'User is required']"
                        label="Select User"
                        solo
                    ></v-select>

                    <v-text-field
                        v-model.number="hours"
                        type="number"
                        label="Enter Hours"
                        solo
                    ></v-text-field>
                    <div>
                        <p>Select the month</p>
                        <v-date-picker
                            v-model="picker"
                            :landscape="landscape"
                            :reactive="reactive"
                            :full-width="fullWidth"
                            :show-current="showCurrent"
                            :type="month ? 'month' : 'date'"
                            :multiple="multiple"
                            :readonly="readonly"
                            :disabled="disabled"
                            :events="enableEvents ? functionEvents : null"
                        ></v-date-picker>
                    </div>
                    <br><br>
                    <v-textarea
                        v-model="notes"
                        solo
                        name="notes"
                        label="Notes..."
                        ></v-textarea>
                    <br>
                    <v-btn
                        
                        color="success"
                        class="mr-4"
                        @click="writeToFirestore"
                    >
                        Add Hours
                    </v-btn>

                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="reset"
                    >
                        Reset Form
                    </v-btn>


                </v-form>
                
                </v-card>
                <br><br>
                <v-card v-if="writeSuccessful" class="default-card">
                    <p>Write was successful!</p>
                </v-card>
            </div>
</template>

<script>
import {fireDb} from '~/plugins/firebase.js'

    export default {
    data: () => ({
        picker: new Date().toISOString().substr(0, 10),
        hours: null,
        valid: true,
        select: "Username",
        lazy: false,
        landscape: false,
        reactive: false,
        fullWidth: false,
        showCurrent: false,
        month: true,
        multiple: false,
        readonly: false,
        disabled: false,
        enableEvents: false,
        userId: null,
        notes: null,
        writeSuccessful: false,
        users: []
    }),

    methods: {
        reset () {
            this.$refs.form.reset()
        },
        writeToFirestore(picker, hours, notes, userId) {
            const ref = fireDb.collection("volunteer-events").add({
                date: this.picker,
                hours: this.hours,
                notes: this.notes,
                userId: this.select,
            })
            this.$refs.form.reset()
            this.writeSuccessful = true
        },
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
                this.users.push((doc.id, '=>', doc.data().name))
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }
}
</script>

<style>
    .default-card {
        padding: 1em;
    }
</style>
