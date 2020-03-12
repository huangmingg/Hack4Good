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
    <v-pagination
      v-model="pg"
      :length="totalpg"
      @input="onPageChange"
    ></v-pagination>
    <v-container class="main" v-if="loc == 'A'">
      {{ show() }}
      <ul>
        <li v-for="i in display" :key="i.name" class="item">
        {{ i.name }}: {{ i.qty }}
        </li>
      </ul>
    </v-container>
    <v-container class="main" v-else>
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
    goods: [
      {name: 'Woodlands', qty: '1500', loc: 'N'},
      {name: 'Yishun', qty: '2200', loc: 'N'},
      {name: 'Sembawang', qty: '1000', loc: 'N'},
      {name: 'Admiralty', qty: '2000', loc: 'N'},
      {name: 'Khatib', qty: '1080', loc: 'N'},
      {name: 'Marsiling', qty: '1200', loc: 'N'},
      {name: 'Yio Chu Kang', qty: '2500', loc: 'N'},
      {name: 'Sengkang', qty: '3200', loc: 'NE'},
      {name: 'Buangkok', qty: '2000', loc: 'NE'},
      {name: 'Punggol', qty: '3500', loc: 'NE'},
      {name: 'Hougang', qty: '2800', loc: 'NE'},
      {name: 'Potong Pasir', qty: '1900', loc: 'NE'},
      {name: 'Kovan', qty: '2500', loc: 'NE'},
      {name: 'Serangoon', qty: '4000', loc: 'NE'},
      {name: 'Boon Keng', qty: '1500', loc: 'NE'},
      {name: 'Woodleigh', qty: '1200', loc: 'NE'},
      {name: 'Little India', qty: '2450', loc: 'NE'},
      {name: 'Dhoby Ghaut', qty: '5000', loc: 'NE'},
      {name: 'Jurong East', qty: '4080', loc: 'W'},
      {name: 'Tuas', qty: '900', loc: 'W'},
      {name: 'Chinese Garden', qty: '1590', loc: 'W'},
    ],
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
      this.arranged = this.arrange(this.filterGds) //arrange the filtered goods
      this.display = this.arranged.slice(0, 5) //by default should show the first 5 items
    },
  },
  computed: { //cannot modify data property here
      filterGds: function() {
        if (this.loc == 'A') {
          return this.goods
        } else {
          return this.goods.filter(good => good.loc == this.loc);
        }
      },
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