import Location from './components/Location.vue'
import Supermarket from './components/Supermarket.vue'
import Category from './components/Category.vue'

const routes = [
    { path: '/', name: 'home',component: Location},
    { path: '/supermarket', name: 'supermarket', component: Supermarket},
    { path: '/cat', name: 'cat',component: Category}
]

export default routes;