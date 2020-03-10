<template>
<!-- step 1 -->

<!-- for page info -->
<v-app>
  <v-sheet height="100" >
    <v-toolbar-title class="head">
      Stock Level for Expiring Goods in the
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
          <v-list-item @click="loc = 'north'">
            <v-list-item-title>North</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'west'">
            <v-list-item-title>West</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'east'">
            <v-list-item-title>East</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loc = 'northeast'">
            <v-list-item-title>North East</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-title>
    <v-container>
      Page
    <v-btn fab text small color="grey darken-2" @click="prev">
      <v-icon text small>mdi-chevron-left</v-icon>
    </v-btn>
    {{ pg }}
    <v-btn fab text small @click="next">
      <v-icon text small>mdi-chevron-right</v-icon>
    </v-btn>
    of {{ totalpg }}
    </v-container>
  </v-sheet>
<!-- for info -->
  <v-sheet v-for="n in totalpg" :key= n>
    <v-container class="main">
      <ul>
        <li v-for="item in arrange(goods)" v-bind:key="item.name" class="item">
        {{ item.name }}: {{ item.qty }}
        </li>
      </ul>
    </v-container>
  </v-sheet>
</v-app>
</template>

<script>
export default {
  data: () => ({
    loc: 'north', //default
    locations: {
        north: 'North',
        west: 'West',
        east: 'East',
        northeast: 'North East',
    },
    pg: 1,
    totalpg: 2,
    goods: [
      {name: 'Woodlands', qty: '1500'},
      {name: 'Yishun', qty: '2200'},
      {name: 'Sembawang', qty: '1000'},
      {name: 'Admiralty', qty: '2000'},
      {name: 'Khatib', qty: '1080'},
      {name: 'Marsiling', qty: '1200'},
      {name: 'Yio Chu Kang', qty: '2500'},
    ],
  }),
  methods: {
    arrange(arr) {
      return arr.slice().sort(
        function(a, b) { // Set slice() to avoid to generate an infinite loop!
          return b.qty- a.qty;
        }
      )
    },
    prev() {
      if(this.pg >= 2) {
          this.pg -= 1;
      }
    },
    next() {
      if(this.pg < this.totalpg) {
        this.pg += 1;
      }
    }
  }
}
</script>

<style scoped>
.head {
  margin-left: 25px;
}
.main {
  padding: 0 calc(50% - 14rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main ul {
  max-lines: 5;
}

.main ul li {
  list-style-type: none;
}
.item {
  box-sizing: border-box;
  background-color: var(#8EA6D0);
  padding: 1rem;
  margin-bottom: 2px;
  color: #fff;
}
</style>