<template>
   
   <v-app>
        {{welcome}}

   </v-app>
   
</template>

<script>
    export default {
     name: 'cat',
     props: ['msg'],

     data() {
        return {
            welcome: 'This is your profile'
        }
     },

     mounted () {
        if (this.msg) {
             console.log("asd")
             console.log(this.msg)
             this.welcome = this.msg
        }
     }
 }
</script>