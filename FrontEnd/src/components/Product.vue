<template>
<v-sheet>
        <v-toolbar-title class="head">
            <strong>{{shop_title}}</strong> 
            <br><v-icon slot="icon" color="#5D737E" size="36" >
      mdi-cart-outline
    </v-icon> Products Available
        </v-toolbar-title>

       <div class="main">
            <li v-for="item in information" :key="item['Package Reference ID']" @click="handleClick(item)">
               
                  <v-hover v-slot:default="{ hover }" open-delay="200">
                <v-card class= "listCard" :elevation="hover ? 16 : 2" height="50" max-width="550">  
                            <b>{{item['Package Name']}}</b>
                            <br>    
                           <font size="2.5"><i> Expiry Date: {{new Date(item['Best Before']).toLocaleDateString()}} </i></font>
                </v-card>
                  </v-hover>                 
            </li>
            </div>
      
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
.listCard{
   background-color:#5D737E;
   color:#F0F7EE;
   margin:0 auto;
}

</style>
