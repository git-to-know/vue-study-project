import { createApp } from 'vue'

import App from './App.vue'
import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

const app = createApp(App)

const routes = [
  { path: '/vue-study-project/', name: 'home', component: Home },
  { path: '/vue-study-project/favorites', name: 'favorites', component: Favorites },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


app.use(router)
app.mount('#app')
