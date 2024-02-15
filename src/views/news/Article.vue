<template>
  <MainLayout>
    <div class="container mx-auto">
      <Card v-if="article" class="mt-6">
        <template #title>
          {{ article.title }}
        </template>
        <template #subtitle>
          {{ article.author }} | {{ moment(article.created_at).startOf('minute').fromNow() }} 
        </template>
        <template #content>
          <div v-html="article.content"/>
        </template>
      </Card>

      <div v-else>Nothing found</div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import router from '@/router';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import moment from "moment";

const article = ref(null);
const route = useRoute();

const getArticle = async (id) => {
  try {
    const response = await axios.get(`/api/news/${id}`)

    if (response.status === 200) {
      article.value = response.data.article
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getArticle(route.params.id);
})


</script>