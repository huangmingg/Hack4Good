<template>
  <v-app>
    <Header></Header>
    <Location v-bind:stockLevel = "stocks"></Location>
    <!-- <Category v-bind:stockLevel = "stocks"></Category>
   <Stepper></Stepper> -->
    <Button class='cont'></Button>
    <Product class='cont'></Product>
    
  </v-app>
</template>

<script>
import Button from "./components/Button.vue";
import Header from "./components/Header.vue";
//import Stepper from "./components/Stepper.vue";
import Product from "./components/Product.vue";
import Location from "./components/Location.vue";
//import Category from "./components/Category.vue";
import IP_ADDRESS from "./env.js";


export default {
  name: 'App',

  components: {
    Button,
    Header,
    //Stepper,
    Product,
    Location,
  // Category
  },

  data: () => ({
    stocks:[]
  }),
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
            return b["items"].length - a["items"].length; 
        })
        console.log(this.stocks);
        });
    }},
    beforeMount () {
      this.retrieveStockLevel();
    },
};
</script>

<style scoped>
.cont {
  margin: auto;
}

.bar {
  color:rgb(10, 50, 100);
}
</style>
