<template>
    <v-btn @click="retrieveProductInformation()">
        Get Detailed Information of Product
    </v-btn>
</template>


<script>
import IP_ADDRESS from "../env.js";
export default {
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
            // do something with the results here
            });
        }
    }
}
</script>
