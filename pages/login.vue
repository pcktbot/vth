<template>
    <v-layout
    column
    justify-center
    align-center
    >
        <v-flex
        xs12
        sm10
        md10
        >

            <h1>Login Page</h1>

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
                        v-model.lazy="email"
                        label="E-mail"
                        required
                        solo
                    ></v-text-field>

                    <v-text-field
                        v-model.lazy="password"
                        label="Password"
                        required
                        solo
                    ></v-text-field>

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="loginWithFirebase"
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

        </v-flex>
    </v-layout>
</template>

<script>
export default {
    methods: {
        loginWithFirebase () {
            const user = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('signInAction', user)
        }
    }
}
</script>
