import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from '../views/HomeScreen.vue'
import SettingsScreen from '../views/SettingsScreen.vue'
import GameScreen from '../views/GameScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeScreen
    },
    {
      path: '/game',
      name: 'game',
      component: GameScreen
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsScreen
    }
  ]
})

export default router
