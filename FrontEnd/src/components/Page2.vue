<template>
   <v-sheet>
        <v-toolbar-title class="head">
            Categories:
        </v-toolbar-title>
        <!-- have to keep this line here for the data  -->
        <p v-show="info">{{information}}</p> 
       
        <v-list class="list">
            <v-list-item v-for="item in removeDuplicates" :key="item"> 
                
                <v-list-item-content class="item">
                    <v-card>
                        <v-list-item-title class="text">
                    {{item}} : {{ information.items.length}}
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
            info: false

        }
     },
     mounted () {
        if (this.stocks) { 
            this.information = this.stocks
        }
     },
     computed: {
         removeDuplicates: function() {
             console.log((this.information.items[0]['Package Category']));
             var set = new Set();
             var i;
             for (i = 0; i < this.information.items.length; i++) {
                set.add(this.information.items[i]['Package Category']);
                } 
            return [...set]
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