<template>
<v-sheet>
    <v-toolbar-title class="head">
        History of stock items:
    </v-toolbar-title>
  <v-timeline class="line" color="yellow">
    <v-timeline-item
    fill-dot
    v-for="n in steps"
    :key=n.id
    class="time"
    color='rgba(226, 171, 53, 0.651)'>
        <v-card class="card">
            <v-card-title class="text">
                {{ n.step }}
            </v-card-title>
            <v-list>
                <v-list-item v-for="details in n.info" :key="details">
                {{ details }}
                </v-list-item>
            </v-list>
        </v-card>
    </v-timeline-item>
  </v-timeline>
</v-sheet>
</template>

<script>
//import IP_ADDRESS from "../env.js";

export default {
    data: () => ({
        name: 'hist',
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
    props: ['stocks'],
    mounted () {
      if (this.stocks) {
          this.history = this.stocks
      }
    },
}
</script>

<style scoped>
.theme--light.v-timeline:before {
    background: rgba(226, 171, 53, 0.651);
}
.line {
    transform: scale(0.75);
    background: rgb(19, 31, 71);
    min-height: 750px;
}
.time {
    max-block-size: 200px;
    font-size: 14px;
    max-width: 850px;
    margin: auto;
}
.card {
    max-width: 350px;
    transform: scale(0.9);
    font-size: 16px;
}
.text {
    color:rgb(19, 31, 71);
    background: rgba(226, 171, 53, 0.651);
    font-size: 21px;
}
.head {
  margin-left: 25px;
  margin-top: 25px;
}

</style>