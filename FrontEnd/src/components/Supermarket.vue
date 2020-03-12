<template>
<!-- step 2 -->
<v-app>
  <v-sheet height="40" >
    <v-toolbar-title class="head">
      Stock Level for Expiring Goods in {{ loc }} for
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn outlined v-on="on">
            <span>{{ supermarkets[mkt] }}
            </span>
            <v-icon bottom>mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="mkt = 'A'; initialDisplay()">
            <v-list-item-title>All Supermarkets</v-list-item-title>
          </v-list-item>
          <v-list-item @click="mkt = 'CS'; show()">
            <v-list-item-title>Cold Storage</v-list-item-title>
          </v-list-item>
          <v-list-item @click="mkt = 'NTUC'; show()">
            <v-list-item-title>NTUC</v-list-item-title>
          </v-list-item>
          <v-list-item @click="mkt = 'SS'; show()">
            <v-list-item-title>Sheng Siong</v-list-item-title>
          </v-list-item>
          <v-list-item @click="mkt = 'G'; show()">
            <v-list-item-title>Giant</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-title>
  </v-sheet>
<!-- for info -->
  <v-sheet>
    <v-pagination
      v-model="pg"
      :length="totalpg"
      @input="onPageChange"
    ></v-pagination>
    <v-container class="main" v-if="def == true">
    {{ initialDisplay() }}
      <ul>
        <li v-for="i in display" :key="i.name" class="item">
        {{ i.name }}: {{ i.qty }}
        </li>
      </ul>
    </v-container>
    <v-container class= "main" v-else>
      <ul>
        <li v-for="i in display" :key="i.name" class="item">
        {{ i.name }}: {{ i.qty }}
        </li>
      </ul>
    </v-container>
  </v-sheet>
</v-app>

</template>

<script>
export default {
  data: () => ({
    mkt: 'A', //default
    loc: 'Woodlands',
    supermarkets: {
        CS: 'Cold Storage',
        SS: 'Sheng Siong',
        NTUC: 'NTUC Fairprice',
        G: 'Giant',
        A: 'All Supermarkets'
    },
    pg: 1,
    maxitems: 5,
    goods: [
      {name: 'Causeway Point Fairprice Extra', qty: 1000, loc: 'Woodlands', mkt: 'NTUC'},
      {name: 'Blk 820 Fairprice', qty: 800, loc: 'Woodlands', mkt: 'NTUC'},
      {name: 'Woodlands Mart Fairprice', qty: 500, loc: 'Woodlands', mkt: 'NTUC'},
      {name: 'Woodlands Plaza Fairprice Finest', qty: 680, loc: 'Woodlands', mkt: 'NTUC'},
      {name: 'Woodlands 534 Fairprice', qty: 100, loc: 'Woodlands', mkt: 'NTUC'},
      {name: 'Fairprice@WoodlandsSt93', qty: 430, loc: 'Woodlands', mkt: 'NTUC'},
      {name: 'Woodlands Field Cold Storage', qty: 1040, loc: 'Woodlands', mkt: 'CS'},
      {name: 'Woodlands Loop Giant', qty: 540, loc: 'Woodlands', mkt: 'G'},
      {name: 'Woodlands Sheng Siong', qty: 520, loc: 'Woodlands', mkt: 'SS'}
    ],
    display: [], //for each page
    def: true,
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
      this.display = display;
    },
    initialDisplay() { //for display page
      this.def = true
      this.display = this.arrange(this.goods).slice(0, 5) //by default should show the first 5 items
    },
    show() { //when user first clicks
      this.def = false
      this.arranged = this.arrange(this.filterGds) //arrange the filtered goods
      this.display = this.arranged.slice(0, 5) //by default should show the first 5 items
    },
  },
  computed: { //cannot modify data property here
      filterGds: function() {
        return this.goods.filter(good => good.mkt == this.mkt);
      },
      totalpg: function() {
        if (this.def == true) {
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
