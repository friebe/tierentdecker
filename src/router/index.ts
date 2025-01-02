import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Animals from '../views/Animals.vue'
import Quiz from '../views/Quiz.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tiere', component: Animals },
    { path: '/quiz', component: Quiz },
  ]
})

export default router