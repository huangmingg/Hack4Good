<template>
<v-stepper v-model="e1">
<!-- stepper header -->
    <v-stepper-header>
        <template v-for="n in steps">
            <v-stepper-step
                :key="n.id"
                :complete="e1 > n.id"
                :step="n.id"
                class="step"
                >
                Step {{ n.id + ": " }} {{ n.step }}
            </v-stepper-step>
        </template>
    </v-stepper-header>
<!--
      <v-stepper-step :complete="e1 > 1" step="1">Step {{ n.id + ": " }} {{ n.step }}</v-stepper-step>
      <v-divider></v-divider>
                      <v-divider
                    v-if="n.id !== steps.length"
                    :key="n.id"
                ></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>-->

<!-- stepper items -->
    <v-stepper-items>
        <v-stepper-content
            v-for="n in steps"
            :key="n.id"
            :step="n.id"
        >
        <keep-alive>
         <component :is='componentName'/>
        </keep-alive>

            <v-btn
            color="primary"
            @click="next"
            >
            Continue
            </v-btn>
            <v-btn
            @click="prev">Back</v-btn>
        </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<!--    <v-stepper-items>
      <v-stepper-content step="1">
          <Location></Location>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <Supermarket></Supermarket>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items> -->


<!--        <v-stepper-header>
            <v-stepper-step step="1">Select location</v-stepper-step>
            <v-stepper-step step="2">Select supermarket</v-stepper-step>
            <v-stepper-step step="3">Select specific store</v-stepper-step>
            <v-stepper-step step="4">Select food category</v-stepper-step>
            <v-stepper-step step="5">Select specific food type</v-stepper-step>
        </v-stepper-header> -->

<script>
import Location from "./Location.vue";
import Supermarket from "./Supermarket.vue";

export default {
    data: () => ({
        e1: 1,
        steps: [
            {id: 1, step: "Select Location"}, //specific location in bar
            {id: 2, step: "Select Supermarket"}, //specific store in bar
            {id: 3, step: "Select Food Category"}, //specific food type in bar
            {id: 4, step: "View the stocks!"}
        ],
    }),
    props: {
        isLocation: {type: Array, default: function() { return ['Location', 'Supermarket']}}
    },
    components: {
        Location,
        Supermarket,
    },
    computed: {
        componentName () {
            return this.isLocation[this.e1-1];
        },
    },
    methods: {
        next() {
            if (this.e1 != this.steps.length) {
                this.e1 += 1
            }
        },
        prev() {
            if (this.e1 != 1) {
                this.e1 -= 1
            }
        }
    }
}
</script>

<style scoped>
.step {
    block-size: 0 5;
    font-size: 14px;
    margin: auto;
}
</style>