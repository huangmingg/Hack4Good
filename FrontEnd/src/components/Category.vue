<template>
   <v-sheet>
        <v-toolbar-title class="head">
            <strong>{{information.shop_name}}</strong> Food Categories: 
        </v-toolbar-title>
        <v-list class="list">
            <v-list-item v-for="key in Object.keys(category)" :key="key" @click="handleClick(key)"> 
                <v-list-item-content class="item">
                    <v-card>
                        <v-list-item-title class="text">
                    {{key}} : {{ category[key] }}
                        </v-list-item-title>
                    </v-card>
               </v-list-item-content>
            </v-list-item>
        </v-list>
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
            // this.category = this.removeDuplicates();
            // console.log(this.category);
        }
     },
     computed: {
    },

    methods: {
    handleClick(key) {
        var categoryItems = this.information.items.filter((item) => {
            return item["Package Category"] == key;
        })
        this.$router.push({name: "product", params: { stocks: categoryItems , shop : this.information.shop_name}});
    },

    removeDuplicates() {
        var set = new Set();
        var i;
        for (i = 0; i < this.information.items.length; i++) {
        set.add(this.information.items[i]['Package Category']);
        } 
        return [...set]
    },

    groupBy() {
        var output = {};
        for (var i = 0; i < this.information.items.length; i++) {
            var cat_name = this.information.items[i]['Package Category']
            if (output[cat_name]) {
                output[cat_name]++;
            } else {
                output[cat_name] = 1;
            }
        }
        return output;
        }

    }
    
 }
 
</script>

<style scoped>
.head {
  margin-left: 25px;
  margin-top: 25px;
  margin-bottom: 65px;
}
.list {
    margin-left: 25px;
    background: rgb(19, 31, 71);
    max-width: 1200px;
    transform: scale(0.9)
}
.item {
    margin-left: 25px;
    margin-block-start: 15px;
    margin-block-end: 15px;
    color:rgb(19, 31, 71);
}
.text {
    margin-left: 25px;
    margin-top: 25px;
    margin-bottom: 25px;

}
</style>