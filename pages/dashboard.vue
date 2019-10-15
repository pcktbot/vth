<template>
    <v-layout
        class="dashboard-style"
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
                <h1>This is my chart</h1>
                <chart />
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import Chart from '~/components/Chart.vue'

export default {
    components: {
        Chart
    },
    data() {
        return {
            
        }
    }
}
</script>

<style>
    .default-card {
        padding: 1em;
        margin: 1em;
    }

</style>