// import Location from './components/Location.vue'
import Supermarket from './components/Supermarket.vue'
import Category from './components/Category.vue'
import Product from "./components/Product.vue";
import Page2 from "./components/Page2.vue";
const routes = [
    { path: '/', name: 'home',component: Product},
    { path: '/supermarket', name: 'supermarket', component: Supermarket},
    { path: '/cat', name: 'cat',component: Category , props: true},
    { path: '/page2', name: 'page2',component: Page2 , props: true}
]

export default routes;