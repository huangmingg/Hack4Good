<template>
  <v-app>
    <Header></Header>
   <router-view></router-view>
    <History></History>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import History from "./components/History.vue";

export default {
  name: 'App',

  components: {
    Header,
    History
  },

  data: () => ({
    
  }),
};
</script>

<style scoped>
.cont {
  margin: auto;
}

.bar {
  color:rgb(10, 50, 100);
}
</style>
