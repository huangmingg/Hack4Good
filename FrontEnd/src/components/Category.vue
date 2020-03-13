<template>
   <v-sheet>
        <v-toolbar-title class="head">
            Stock Levels for {{ information.shop_name }}
        </v-toolbar-title>
        <v-list>
            <v-list-item v-for="item in information.items" :key="item['Package Reference ID']"> 
                <v-list-item-content>
                    <v-list-item-title v-text="item['Package Name']"></v-list-item-title>
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
            information: []
        }
     },
     mounted () {
        if (this.stocks) {
            this.information = this.stocks
        }
     }
 }
</script>