<template>
   <v-sheet>
        <v-btn @click="handleBack()">
            <v-icon dark left >mdi-arrow-left</v-icon>Back
        </v-btn>
        <v-toolbar-title class="head">
            Stock Levels for {{ information.shop_name }}
        </v-toolbar-title>
        <v-list>
            <v-list-item v-for="item in information.items" :key="item['Package Reference ID']" @click="handleClick(item)"> 
                <v-list-item-content>
                    <v-list-item-title v-text="item['Package Name']"></v-list-item-title>
               </v-list-item-content>
            </v-list-item>
        </v-list>
  </v-sheet>
</template>

<script>
import IP_ADDRESS from "../env.js";
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
        },
    methods: {
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
            });
        },

    handleClick(item) {
        this.$router.push({name: "product", params: { stocks: item }});
        },

    handleBack() {
        this.$router.back();
        }
    }
    }
 
</script>