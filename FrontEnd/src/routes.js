import Category from './components/Category.vue'
import Home from "./components/Home.vue";
import Product from "./components/Product.vue";

const routes = [
    { path: '/', name: 'home',component: Home},
    { path: '/cat', name: 'cat',component: Category , props: true},
    { path: '/cat/product', name: 'product',component: Product , props: true}



]

export default routes;