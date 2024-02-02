import { useAuthStore } from "@/stores/auth.js";


export function guest(to, from, next) {
  const authStore = useAuthStore()
  if (!authStore.user) {
    next();
  } else {
    next('/');
  }
}