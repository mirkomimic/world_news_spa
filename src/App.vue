<script setup>

</script>

<template>
  <!-- <Transition name="fade">
    <RouterView />
  </Transition> -->

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
