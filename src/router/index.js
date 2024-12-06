import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Favorites from '../components/FavoritesView.vue'
import LoginView from '@/components/LoginView.vue'
import RegisterView from '@/components/RegisterView.vue'
import ModalView from '@/components/ModalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    },
    {
      path: '/modal',
      name: 'modal',
      component: ModalView,
    },
  ],
})

export default router
