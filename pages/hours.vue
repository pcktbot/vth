<template>
    <v-layout
    column
    justify-center
    align-center
    fill-height
    >
        <v-flex
        xs12
        sm10
        md10
        >

            <add-hours />
            <hours />

        </v-flex>
    </v-layout>
</template>

<script>
import AddHours from '~/components/AddHours.vue'
import Hours from '~/components/Hours.vue'

export default {
    components: {
        AddHours,
        Hours
    }
}
</script>

<style>
    .default-card {
        padding: 1em;
    }
</style>

