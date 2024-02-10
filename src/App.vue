<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.user) {
    await authStore.getUser()  
  }
})
</script>

<template>
  <RouterView />
</template>
