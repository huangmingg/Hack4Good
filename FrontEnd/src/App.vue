<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
  <!--  <Stepper></Stepper>
    <Button class='cont'></Button>
    <Product class='cont'></Product> -->
    
  </v-app>
</template>

<script>
// import Button from "./components/Button.vue";
import Header from "./components/Header.vue";
//import Stepper from "./components/Stepper.vue";
//import Product from "./components/Product.vue";
//import Location from "./components/Location.vue";
//import Category from "./components/Category.vue";



export default {
  name: 'App',

  components: {
  //  Button,
    Header,
  //  Stepper,
  //  Product,
  //  Location,
  //  Category
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
