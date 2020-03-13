<template>
<!-- step 1 -->

<!-- for page info -->
<v-app>
  
  <v-sheet>
    <v-container class="main">
      <ul>
       <!-- <li v-for="i in display" :key="i.name" class="item"> -->
          <li v-for="i in stocks" :key="i.shop_name">
         <!--  <button v-on:click = " ">  -->
            {{ i.shop_name }}: {{i.items.length}} 
        </li>
      </ul>
    </v-container>
    
  </v-sheet>
  <v-sheet>
    Test
    {{stocks}}
    
    </v-sheet>
</v-app>

</template>

<script>
import IP_ADDRESS from "../env.js";
export default {
  data: () => ({
    stocks: [],
    }),
  methods: {
  //  select: function(shopName) {
  //      window.location.href = person.url;
  //  },
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
  computed: { //cannot modify data property here
 /*     filterGds: function() {
        if (this.loc == 'A') {
          return this.goods
        } else {
          return this.goods.filter(good => good.loc == this.loc);
        }
      }, */
      totalpg: function() {
        if (this.loc == 'A') {
          return Math.ceil(this.goods.length/this.maxitems);
        } else {
          return Math.ceil(this.filterGds.length/this.maxitems);
        }
      },
   },
   
}
</script>

<style scoped>
.head {
  margin-left: 25px;
}

.main ul li {
  list-style-type: none;
  padding: 20px;
  margin: 5px;
}

/*.item {
  box-sizing: border-box;
  background-color: var(#8EA6D0);
  padding: 1rem;
  margin-bottom: 2px;
}*/
</style>