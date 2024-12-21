import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Animals from '../views/Animals.vue'
import Game from '../views/Game.vue'
import Quiz from '../views/Quiz.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tiere', component: Animals },
    { path: '/spiel', component: Game },
    { path: '/quiz', component: Quiz },
  ]
})

export default router