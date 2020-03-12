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
      <!-- <ul>
        <li v-for="item in arrange(goods)" v-bind:key="item.name" class="item">
        {{ item.name }}: {{ item.qty }}
        </li>
      </ul> -->
    </v-container>
    
  </v-sheet>
  <GChart
    :settings="{packages: ['corechart']}"      
    :resizeDebounce="500" 
    :data="chartData"
    :options="chartOptions"
    :events="chartEvents"
    :createChart="(el, google) => new google.visualization.BarChart(el)"
    @ready="onChartReady"
  />
  <router-link to="/supermarket" exact>hello</router-link>;
</v-app>
</template> 

<script>
import { GChart } from 'vue-google-charts'
export default {
  data() {
    return {
    loc: 'north', //default
    locations: {
        north: 'North',
        west: 'West',
        east: 'East',
        northeast: 'North East',
    },
    pg: 1,
    totalpg: 2,
    chartsLib: null, 
    chartData: [
      ['Area', 'Amount', { role: 'style' }],
      ['Woodlands', 1500, 'blue'],            // RGB value
      ['Yishun', 2200, 'blue'],            // English color name
      ['Sembawang', 1000, 'blue'],
      ['Admiralty', 2000, 'blue' ], 
      ['Khatib', 1080, 'blue' ], 
      ['Marsling', 1200, 'blue' ], 
      ['Yio Chu Kang', 2500, 'blue' ], 
    ],
    chartOptions: {
        height: 300,
    },
    chartEvents: {
      select: () => {      
        alert("next page"),
        <router-link to="/supermarket" exact>this.$refs.gChart.chartObject;</router-link>;
    } 
  }
  }},
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
    },
    onChartReady (chart, google) {
      this.chartsLib = google
    },
  },
  components: {
    GChart
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