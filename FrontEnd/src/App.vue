<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content class="cont">
      <h2>
        Welcome!
      </h2>
      <Button></Button>
      
    </v-content>
  </v-app>
</template>

<script>
import Button from "./components/Button.vue";

export default {
  name: 'App',

  components: {
    Button
  },

  data: () => ({

  }),
};
</script>

<style scoped>
.cont {
  margin:auto;
}
</style>
