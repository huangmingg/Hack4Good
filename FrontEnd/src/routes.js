import Category from './components/Category.vue'
import Home from "./components/Home.vue";
import Product from "./components/Product.vue";
import Page2 from "./components/Page2.vue";
const routes = [
    { path: '/', name: 'home',component: Home},
    { path: '/cat', name: 'cat',component: Category , props: true},
    { path: '/cat/product', name: 'product',component: Product , props: true},
    { path: '/page2', name: 'page2',component: Page2 , props: true}
]

export default routes;