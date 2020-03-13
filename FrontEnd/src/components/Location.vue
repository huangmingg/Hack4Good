<template>
<!-- step 1 -->

<!-- for page info -->
<v-app>
  <v-sheet height="40" >
    <v-toolbar-title class="head">
      Stock Level for Expiring Goods in
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
            <span>{{ locations[loc] }}
            </span>
            <v-icon bottom>mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="loc = 'A'; show()">
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
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-title>
  </v-sheet>
<!-- for info -->

  <v-sheet>

    <v-container class="main">
      <li v-for="stock in stockLevel" v-bind:key = "stock.name">
            {{stock.shop_name}} : {{stock.items.length}}
        </li>
      <ul>
       <!-- <li v-for="i in display" :key="i.name" class="item"> -->
          <!-- <li v-for="i in stocks" :key="i.shop_name">
          {{ i.shop_name }}: {{i.items.length}}
        </li> -->
      </ul>
    </v-container>
    
  </v-sheet>
</v-app>

</template>

<script>

export default {
  props:{
          stockLevel:{
              type:Array
          }
      },
  data: () => ({
    loc: 'A', //default
    def: true,
    locations: {
        N: 'North',
        W: 'West',
        E: 'East',
        NE: 'North East',
        A: 'All Locations'
    },
    pg: 1,
    maxitems: 5,
    stocks: [],
    display: [], //for each page
    arranged: [], //for an arranged version of filtered goods
    }),
  methods: {
    arrange: function(arr) {
      return arr.slice().sort((a, b) => b.qty - a.qty); // slice so that it clones the array to avoid to generate an infinite loop!
    },
    onPageChange() {
      var display= [] //empty the display array everytime the page number changes
      var i=0;
      for (i=0; i < this.maxitems; i++) {
        var index = (this.pg-1)*this.maxitems + i
        if (index < this.arranged.length) { //so that index does not exceed range
          display.push(this.arranged[index]); //fill in display array with new values
        } else {
          break;
        }
      }
      alert("this.arranged = " + this.arranged + ", display = " + display)
      this.display = display;
    },
    show() { //for the first page
      this.pg = 1
      this.arranged = this.arrange(this.filterGds) //arrange the filtered goods
      this.display = this.arranged.slice(0, 5) //by default should show the first 5 items
    },
  
  computed: { 
      totalpg: function() {
        if (this.loc == 'A') {
          return Math.ceil(this.goods.length/this.maxitems);
        } else {
          return Math.ceil(this.filterGds.length/this.maxitems);
        }
      },
   },

  }
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