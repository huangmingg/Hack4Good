<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <template v-for="n in steps">
                <v-stepper-step
                    :key="`${n.id}-step`"
                    :complete="e1 > n.id"
                    :step="n.id"
                >
                    Step {{ n.id + ": " }} {{ n.step }}
                </v-stepper-step>
                <v-divider
                    v-if="n.id !== steps.length"
                    :key="n.id"
                ></v-divider>
            </template>

            <v-stepper-items>
                <v-stepper-content
                    v-for="n in steps"
                    :key="`${n}-step`"
                    :step="n"
                >
                    <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                    ></v-card>

                    <v-btn
                    color="primary"
                    @click="nextStep(n)"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper-header>
    </v-stepper>
</template>


<!--        <v-stepper-header>
            <v-stepper-step step="1">Select location</v-stepper-step>
            <v-stepper-step step="2">Select supermarket</v-stepper-step>
            <v-stepper-step step="3">Select specific store</v-stepper-step>
            <v-stepper-step step="4">Select food category</v-stepper-step>
            <v-stepper-step step="5">Select specific food type</v-stepper-step>
        </v-stepper-header> -->

<script>
export default {
    data: () => ({
        e1: 1,
        steps: [
            {id: 1, step: "Select Location"},
            {id: 2, step: "Select Supermarket"},
            {id: 3, step: "Select Specific Store"},
            {id: 4, step: "Select Food Category"},
            {id: 5, step: "Select Specific Food Type"}
        ]
    }),
    watch: {
        steps(val) {
            if (this.e1 > val) {
                this.e1 = val
            }
        }
    },
    methods: {
        onInput(val) {
            this.steps = parseInt(val)
        },
        nextStep(n) {
            if (n == this.steps) {
                this.e1 = 1
            } else {
                this.e1 = n + 1
            }
        },
    }
}
</script>