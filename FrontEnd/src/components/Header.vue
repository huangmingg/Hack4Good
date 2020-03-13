<template>
    <header class="header-login-signup">
    <span>
        FoodBlocks
    </span>
        <nav>
        <ul>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data: () => ({
    })
}
</script>

<style scoped>
.header-login-signup {
	background-color:rgba(226, 171, 53, 0.651);
	box-shadow:0 1px 1px #ccc;
	padding: 10px;
	height: 60px;
	text-align: center;
}

.header-login-signup span {
    float: left;
    margin-top: 10px;
    font-size: 20px;
    margin-left: 10px;
}

.header-login-signup nav {
	font:16px Arial, Helvetica, sans-serif;
	float: right;
	padding: 5px;
}

.header-login-signup ul li {
	display: inline-flex;
	margin-left: 15px;
    margin-right: 10px;
	margin-top: 10px;
    list-style-type: none;
}

.header-login-signup ul {
	font: 14px Arial, Helvetica, sans-serif;
	list-style: none;
	line-height: 1;
	float: right;
}

</style>