<template>
   <v-sheet>
        <v-toolbar-title class="head">
            <v-icon slot="icon" color="#5D737E" size="36" >
      mdi-map-marker
    </v-icon><strong>Store: {{information.shop_name}}</strong> 
            <!-- <br><p>Food Categories Available</p> -->
        </v-toolbar-title>
        <div class="main">
            <li v-for="key in Object.keys(category)" :key="key" @click="handleClick(key)"> 
                <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card class= "listCard" :elevation="hover ? 16 : 2" height="50" max-width="550">           
                    <font size="4.5"><strong>{{key}} </strong></font>
                    <br><font size="2.5">{{ category[key] }} item left!   </font>        
                </v-card>
                </v-hover>
            </li>
        </div>
  </v-sheet>
</template>

<script>
    export default {
     name: 'cat',
     props: ['stocks'],
     data() {
        return {
            information: [],
            category: []
        }
     },
     mounted () {
        if (this.stocks) { 
            this.information = this.stocks
            this.category = this.groupBy();
            this.sort();
        }
     },
     computed: {
    },

    methods: {
    handleClick(key) {
        var categoryItems = this.information.items.filter((item) => {
            return item["Package Name"] == key;
        })
        this.$router.push({name: "product", params: { stocks: categoryItems , shop : this.information.shop_name}});
    },

    groupBy() {
        var output = {};

        for (var i = 0; i < this.information.items.length; i++) {
            var cat_name = this.information.items[i]['Package Name']
            if (output[cat_name]) {
                output[cat_name]++;
            } else {
                output[cat_name] = 1;
            }
        }
        return output;
    },

    sort() {
        var sortable = [];
        for (var i in this.category) {
            sortable.push([i, this.category[i]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        var objSorted = {}
        sortable.forEach(function(item){
            objSorted[item[0]]=item[1]
        })
        this.category = objSorted;
        
    }



    }
    
 }
 
</script>

<style scoped>
.head {
  margin-left: 25px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
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
.text {
    margin-left: 25px;
    margin-top: 25px;
    margin-bottom: 25px;
    background-color:#5D737E;
    color:aliceblue;

}
.listCard{
   background-color:#5D737E;
   color:#F0F7EE;
   margin:0 auto;
}
</style>