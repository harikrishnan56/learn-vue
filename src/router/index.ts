import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from '../views/HomeScreen.vue'
import LevelPreviewScreen from '../views/LevelPreviewScreen.vue'
import GameScreen from '../views/GameScreen.vue'
import SettingsScreen from '../views/SettingsScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeScreen
    },
    {
      path: '/stage/:stageId/preview',
      name: 'level-preview',
      component: LevelPreviewScreen,
      props: true
    },
    {
      path: '/game/:stageId',
      name: 'game',
      component: GameScreen,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsScreen
    }
  ]
})

export default router
