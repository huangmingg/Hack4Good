// import Location from './components/Location.vue'
import Supermarket from './components/Supermarket.vue'
import Category from './components/Category.vue'
import Product from "./components/Product.vue";
const routes = [
    { path: '/', name: 'home',component: Product},
    { path: '/supermarket', name: 'supermarket', component: Supermarket},
    { path: '/cat', name: 'cat',component: Category , props: true}
]

export default routes;