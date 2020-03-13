<template>
   
   <v-app>
       hi
        <li v-for="stock in stockLevel" v-bind:key = "stock.name">
            {{stock.shop_name}}
        </li>
   </v-app>
   
</template>

<script>
    export default {
      props:{
          stockLevel:{
              type:Array
          }
      }
    }
</script>