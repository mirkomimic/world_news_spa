<template>
  <div>
    <NavBar/>
    <div class="min-h-screen">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';

</script>