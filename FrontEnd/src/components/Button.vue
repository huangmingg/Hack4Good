<template>
    <v-btn @click="retrieveStockLevel">
        Get stock level for all
    </v-btn>
</template>


<script>
import IP_ADDRESS from "../env.js";
export default {
    methods: {
    async retrieveStockLevel() {
      await fetch(IP_ADDRESS + '/truffle/fetchStockLevel', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'}
        })
      .catch((error) => {console.log(error)})
      .then((response) => response.json())
      .then((res) => {console.log(res)});
      }
    },
}
</script>
