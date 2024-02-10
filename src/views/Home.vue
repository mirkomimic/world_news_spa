<template>
  <MainLayout>
    Home
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore()

</script>