<template>
<v-sheet>
        <v-toolbar-title class="head">
            <strong>{{shop_title}}</strong> Products 
        </v-toolbar-title>

        <v-list class="list">
            <v-list-item v-for="item in information" :key="item['Package Reference ID']" @click="handleClick(item)">
                <v-list-item-content class="item">
                    <v-card>
                        <v-list-item-title class="text">
                            {{item['Package Name']}}
                        </v-list-item-title>
                        <v-list-item-title class="text">
                            {{new Date(item['Best Before']).toLocaleDateString()}}
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
     props: ['stocks','shop'],
     data() {
        return {
            information: [],
            shop_title : ""            
        }
     },
     mounted () {
        if (this.stocks && this.shop) {
            this.information = this.stocks
            this.shop_title = this.shop
        }
     },
    methods: {
    handleBack() {
        this.$router.back();
    },
    handleClick(item) {
        this.$router.push({name: "history", params: { stocks: item , shop : this.shop_title}});
    },
}
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
