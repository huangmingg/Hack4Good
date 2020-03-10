<template>
  <v-app>
    <Header></Header>
    <Stepper></Stepper>
    <v-content>
      <Expiring></Expiring>
      <Button class='cont'></Button>
    </v-content>
  </v-app>
</template>

<script>
import Button from "./components/Button.vue";
import Header from "./components/Header.vue";
import Expiring from "./components/Expiring.vue";
import Stepper from "./components/Stepper.vue";

export default {
  name: 'App',

  components: {
    Button,
    Header,
    Expiring,
    Stepper,
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
