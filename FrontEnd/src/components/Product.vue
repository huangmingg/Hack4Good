<template>
<v-sheet>
    <v-toolbar-title class="head">
      Stock Level for Expiring Goods in 3 days
    </v-toolbar-title>
        <v-list>
            <v-list-item v-for="stock in stocks" :key="stock.shop_name" @click="handleClick(stock)"> 
                <v-list-item-content>
                    <v-list-item-title v-text="stock.shop_name + ' : ' + stock.items.length"></v-list-item-title>
                    <v-list-item-avatar>
                        <v-list-item-title v-text="stock.items.length"></v-list-item-title>
                    </v-list-item-avatar>
               </v-list-item-content>
            </v-list-item>
        </v-list>
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
            });
        },


    handleClick(stocks) {
        this.$router.push({name: "cat", params: { stocks: stocks }});
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
            return b["items"].length - a["items"].length; 
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
