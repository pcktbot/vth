<template>
    <v-layout
    column
    justify-center
    align-center
    >
        <v-flex
        xs12
        sm8
        md6
        >
                
            <div class="text-center">
                <add-user />
            </div>
            <div class="text-center">
                <users />
            </div>

        </v-flex>
    </v-layout>
</template>

<script>
import {fireDb} from '~/plugins/firebase.js'
import AddUser from '~/components/AddUser.vue'
import Users from '~/components/Users.vue'

export default {
    components: {
        AddUser,
        Users
    }
}
</script>
