<template>
<v-sheet>
    <v-toolbar-title class="head">
       <v-icon slot="icon" color="#5D737E" size="36" >
      mdi-history
    </v-icon> History of stock items
    </v-toolbar-title>
  <v-timeline class="line" color="#5D737E">
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
import IP_ADDRESS from "../env.js";

export default {
    data: () => ({
        name: 'hist',
        steps: [
        ],
        history: [],
        shop_title: ""
    }),
    props: ['stocks', 'shop'],
    mounted () {
      if (this.stocks && this.shop) {
        this.history = this.stocks
        this.shop_title = this.shop
        var produceID = this.history["Asset ID"] 
        this.retrieveProductInformation(produceID)
      }
    },

    methods: {
    async retrieveProductInformation(produceID) {
        await fetch(IP_ADDRESS + '/truffle/package/information?produceID=' + produceID, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
            })
        .catch((error) => {console.log(error)})
        .then((response) => response.json())
        .then((res) => {
            this.steps.push({id: 1, step: "Retail Information", info: 
            [
            `Package Reference ID : ${this.history['Package Reference ID']}`,
            `Package Weight : ${this.history['Package Weight']}`,
            `Package Name : ${this.history['Package Name']}`,
            `Retailer : ${this.shop_title}`,
            `Best Before : ${new Date(this.history["Best Before"]).toLocaleDateString()}`
            ]});

            this.steps.push({id: 2, step: "Processo Information", info: 
            [
            `Processor : ${this.history["Processor"]}`, 
            `Processed Date : ${new Date(this.history["Processed Date"]).toLocaleDateString()}`
            ]});

            this.steps.push({id: 3, step: "Produce Information", info: 
            [
            `Produce Reference ID : ${res.message["ProduceRefID"]}`, 
            `Produce Name         : ${res.message["Produce Name"]}`, 
            `Date of Birth        : ${new Date(res.message["Date of Birth"]).toLocaleDateString()}`,
            `Producer             : ${res.message["Producer"]}`, 
            `Country of Origin    : ${res.message["Country"]}`
            ]});
            });
        },

    }
}
</script>

<style scoped>
.theme--light.v-timeline:before {
    background: #5D737E;
}
.line {
    transform: scale(0.75);
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
    color:white;
    background: #5D737E;
    font-size: 21px;
}
.head {
  margin-left: 25px;
  margin-top: 25px;
  text-align: center;
}

</style>