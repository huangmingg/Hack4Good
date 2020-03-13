<template>
<v-sheet height="40">
    <v-toolbar-title class="head">
      Stock Level for Expiring Goods in 3 days
      <v-menu>
        <v-list v-for="(stock) in stocks" :key="stock.shop_name" @click="retrieveProductInformation()">
            <v-list-item> </v-list-item>
          <!-- <v-list-item @click="loc = 'A'; show()">
            <v-list-item-title>All Locations</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'N'; show()">
            <v-list-item-title>North</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'W'; show()">
            <v-list-item-title>West</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'E'; show()">
            <v-list-item-title>East</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'NE'; show()">
            <v-list-item-title>North East</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-toolbar-title>
  </v-sheet>
</template>

<script>
import IP_ADDRESS from "../env.js";
export default {
    methods: {
    async retrieveProductInformation() {
        var produceID = 0;
        await fetch(IP_ADDRESS + '/truffle/package/information?produceID=' + produceID, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
            })
        .catch((error) => {console.log(error)})
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            // do something with the results here
            });
        },
    async retrieveStockLevel() {
      await fetch(IP_ADDRESS + '/truffle/stock/levels', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'}
        })
      .catch((error) => {console.log(error)})
      .then((response) => response.json())
      .then((res) => {
        for (var i = 0; i < res.message.length; i++) {
            var shopName = res.message[i].shop_name; 
            var items = res.message[i].res;
            var expiringItems = items.filter((object) => {
                return object["Best Before"] < (parseInt(Date.now()) + 60000 * 60 * 24 * 3);
            })
            this.stocks.push({"shop_name" : shopName, "items" : expiringItems});
        }
        this.stocks.sort(function(a, b) {
            return a["items"].length - b["items"].length; 
        })
        console.log(this.stocks);
        });
    }},

    beforeMount () {
      this.retrieveStockLevel();
    },

    data: () => ({
        stocks : [
            
        ]
    })
}
</script>
