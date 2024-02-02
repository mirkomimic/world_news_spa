<template>
  <MainLayout/>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore()

// onMounted(async () => {
//   await authStore.getUser();
// })

</script>