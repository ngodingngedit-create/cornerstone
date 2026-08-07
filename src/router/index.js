import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicketSelectionPage from '../components/TicketSelectionPage.vue'
import RegistrationFormPage from '../components/RegistrationFormPage.vue'
import SuccessPage from '../views/SuccessPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/event/r2c',
    name: 'event',
    component: TicketSelectionPage
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: RegistrationFormPage
  },
  {
    path: '/success/:invoice',
    name: 'success',
    component: SuccessPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router