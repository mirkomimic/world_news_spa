import 'primeicons/primeicons.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "/node_modules/flag-icons/css/flag-icons.min.css";

import App from './App.vue'
import router from './router'
import './axios.js'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';

const app = createApp(App)
const pinia = createPinia()

// pinia.use(({ store }) => {
//   store.router = markRaw(router)
// })

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(ToastService)
app.use(PrimeVue)

app.mount('#app')
