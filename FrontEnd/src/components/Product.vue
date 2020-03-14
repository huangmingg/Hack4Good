<template>
<v-sheet>
    <v-toolbar-title class="head">
      Stock Level for Expiring Goods in 3 days
    </v-toolbar-title>
        <v-list class="list">
            <v-list-item v-for="stock in stocks" :key="stock.shop_name" @click="handleClick(stock)">
                <v-list-item-content class="item">
                    <v-card>
                    <v-list-item-title v-text="stock.shop_name + ' : ' + stock.items.length" class= "text"></v-list-item-title>
                    <v-list-item-avatar>
                        <v-list-item-title v-text="stock.items.length"></v-list-item-title>
                    </v-list-item-avatar>
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

    handleBack() {
        this.$router.back();
    },


    handleClick(stocks) {
        this.$router.push({name: "page2", params: { stocks: stocks }});
    },

    async retrieveStockLevel() {
      await fetch(IP_ADDRESS + '/truffle/stock/levels', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'}
        })
      .catch((error) => {console.log(error)})
      .then((response) => response.json())
      .then((res) => {
        for (var i = 0; i < res.message.length; i++) {
            var shopName = res.message[i].shop_name; 
            var items = res.message[i].res;
            var expiringItems = items.filter((object) => {
                return object["Best Before"] < (parseInt(Date.now()) + 60000 * 60 * 24 * 3);
            })
            this.stocks.push({"shop_name" : shopName, "items" : expiringItems});
        }
    }

    data: () => ({
        stocks : [
        ]
    })
}
</script>

<style scoped>
.head {
  margin-left: 25px;
  margin-top: 25px;
}
.list {
    margin-left: 25px;
    background: rgb(19, 31, 71);
    max-width: 1200px;
    transform: scale(0.9);
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
}
</style>
