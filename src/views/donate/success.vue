<template>
  <MainLayout>
    <h1 class="text-3xl text-center mt-3">Thank you for donating!</h1>

    <router-link :to="{ name: 'Home' }">
      <Button label="Go back"/>
    </router-link>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
</script>