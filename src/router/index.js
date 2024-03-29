import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import { guest } from '@/middleware/middleware'
import { useAuthStore } from "@/stores/auth.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { title: 'Home' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/Login.vue'),
      meta: { title: 'Login' },
      beforeEnter: guest,
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/Register.vue'),
      meta: { title: 'Sign Up' },
      beforeEnter: guest,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: { title: 'Forgot Password' },
    },
    {
      path: '/password-reset/:token',
      name: 'ResetPassword',
      component: () => import('@/views/auth/ResetPassword.vue'),
      meta: { title: 'Reset Password' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/Dashboard.vue'),
      meta: { title: 'Dashboard' }
    },
    {
      path: '/dashboard/newsapi',
      name: 'DashboardNewsApi',
      component: () => import('@/views/admin/NewsApi.vue'),
      meta: { title: 'Dashboard | News' }
    },
    {
      path: '/dashboard/published-news',
      name: 'DashboardPublishedNews',
      component: () => import('@/views/admin/PublishedNews.vue'),
      meta: { title: 'Dashboard | Published News' }
    },
    {
      path: '/dashboard/payments',
      name: 'DashboardPayments',
      component: () => import('@/views/admin/Payments.vue'),
      meta: { title: 'Dashboard | Payments' }
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('@/views/news/Article.vue'),
      meta: { title: 'Article' }
    },
    {
      path: '/donate',
      name: 'DonateIndex',
      component: () => import('@/views/donate/Index.vue'),
      meta: { title: 'Donate' }
    },
    {
      path: '/donate/checkout',
      name: 'DonateCheckout',
      component: () => import('@/views/donate/Checkout.vue'),
      meta: { title: 'Checkout' }
    },
    {
      path: '/donate/success',
      name: 'DonateSuccess',
      component: () => import('@/views/donate/success.vue'),
      meta: { title: 'Success' }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = `World News - ${to.meta.title}`

  const authStore = useAuthStore();
  const guestRoutes = ['Login', 'Register']

  if (authStore.user && guestRoutes.includes(to.name)) {
    next({ name: 'Home' }) 
  } else next()
})

export default router
