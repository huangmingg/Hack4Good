<template>
<v-sheet>
    <v-toolbar-title class="head">
       <v-icon slot="icon" color="#5D737E" size="36" >
      mdi-chart-bar
    </v-icon> Stock Level for Expiring Goods in 3 days
    </v-toolbar-title>
        <div class="main">
            <li v-for="stock in stocks" :key="stock.shop_name" @click="handleClick(stock)"> 
              <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card class= "listCard" :elevation="hover ? 16 : 2" height="50" max-width="550">               
               <i><font size="4"> {{stock.shop_name}}</font></i><br>
                <strong>{{stock.items.length}}</strong> item expiring soon
                </v-card>
              </v-hover>
            </li>

        </div>
  </v-sheet>
  
</template>

<script>
import IP_ADDRESS from "../env.js";
export default {
    methods: {

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

<style scoped>
.head{
  padding: 40px;
  text-align: center;
  font-size: 30px;
}
.main{
  padding-top: 10px;
  padding-bottom: 30px;
     width:800px;
     margin:0 auto;

}
.main li {
  text-align: center;
  list-style-type: none;
  font:  15px/1.5 Helvetica, Verdana, sans-serif;
  margin-bottom: 20px;
  
}
.listCard{
   background-color:#5D737E;
   color:#F0F7EE;
   margin:0 auto;
}

</style>