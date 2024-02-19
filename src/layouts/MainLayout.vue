<template>
  <div>
    <NavBar/>
    <div class="min-h-[calc(100vh-50px)]">
      <Transition name="fade" appear>
        <div>
          <slot/>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';

</script>