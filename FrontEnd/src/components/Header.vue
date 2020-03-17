<template>
    <header class="header-login-signup">
    <span>
        <v-img height="1.45cm" width = "3cm" src="../assets/FoodBlocks.png" @click="goToHome()"></v-img>
    </span>
    </header>
</template>

<script>
export default {
    data: () => ({
    }),
    methods: {
        goToHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.header-login-signup {
	background-color:#e2ab35a6;
	box-shadow:0 1px 1px #ccc;
	padding: 10px;
	height: 75px;
	text-align: center;
}

.header-login-signup span {
    float: left;
    margin-top: 5px;
    font-size: 20px;
    margin-left: 5px;
}

</style>