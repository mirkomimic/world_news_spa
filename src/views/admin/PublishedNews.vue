<template>
  <AdminLayout>
    <template #heading>Dashboard - Published News</template>
    test
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const news = ref(null)

const getNews = async () => {
  try {
    const response = await axios.get('/api/news');

    if (response.status === 200) {
      news.value = response.data.news
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getNews();
})
</script>