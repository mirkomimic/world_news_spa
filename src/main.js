// import './assets/main.css'
// import 'primevue/resources/themes/aura-dark-blue/theme.css'
import 'primeicons/primeicons.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import './axios.js'
import PrimeVue from 'primevue/config'

const app = createApp(App)
const pinia = createPinia()

// pinia.use(({ store }) => {
//   store.router = markRaw(router)
// })

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(PrimeVue)

app.mount('#app')
