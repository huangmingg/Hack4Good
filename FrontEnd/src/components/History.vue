<template>
  <v-timeline>
    <v-timeline-item
    v-for="n in steps"
    :key=n.id
    class="time">
        {{ n.step }}
        <v-card class="card">
            <v-list>
                <v-list-item v-for="details in n.info" :key="details">
                {{ details }}
                </v-list-item>
            </v-list>
        </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
//import IP_ADDRESS from "../env.js";

export default {
    data: () => ({
        steps: [
            {id: 1, step: "Retailer Information", info:
            ['Fairprice', '02-03-20']}, //seller
            {id: 2, step: "Processor Information", info:
            ['Processor', 'Reference ID', 'Weight', 'Process Date']}, //processor
            {id: 3, step: "Producer Information", info:
            ['Farm name', 'Cow Species', 'Reference ID', 'DOB of cow']}, //farm
        ],
        history: []
    }),
    props: ['products'],
    mounted () {
      if (this.products) {
          this.history = this.products
      }
    },
    methods: {
    }
}
</script>

<style scoped>
.time {
    max-block-size: 200px;
    font-size: 14px;
    max-width: 850px;
    margin: auto;
}
.card {
    max-width: 350px;
}
</style>