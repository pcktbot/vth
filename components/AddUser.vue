<template>
    <div class="main">
    <v-card 
                class="default-card"
            >

                <h1>Add User</h1>

                <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
                >
                <v-text-field
                    v-model.lazy="name"
                    :counter="30"
                    :rules="nameRules"
                    label="Full Name"
                    required
                    solo
                ></v-text-field>

                <v-text-field
                    v-model.lazy="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    solo
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="writeToFirestore"
                >
                    Submit
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
                <p>Entry added successfully.</p>
            </v-card>
            </div>
</template>
        

<script>
import {fireDb} from '~/plugins/firebase.js'
import AddUser from '~/components/AddUser.vue'

    export default {
        data: () => ({
            writeSuccessful: false,
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            lazy: false,
        }),

        methods: {
            reset () {
                this.$refs.form.reset()
            },
            async writeToFirestore(name, email) {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
                const ref = fireDb.collection("users").add({
                    name: this.name,
                    email: this.email
                })  
                this.writeSuccessful = true
                this.$refs.form.reset()
            },
            async readFromFirestore() {
                
            }
        }
    }
</script>

<style>
    .default-card {
        padding: 1em;
    }
</style>