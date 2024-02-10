<template>
  <div>
    <NavBar/>
    <div class="min-h-screen">
      <div class="grid grid-cols-3 items-center">
        <AdminSidebar/>
        <h1 class="justify-self-center">
          <slot name="heading"/>
        </h1>
      </div>
      <Transition name="fade" appear>
        <div class="container mx-auto">
          <slot/>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

</script>