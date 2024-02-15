<template>
  <AdminLayout>
    <template #heading>Dashboard - Published News</template>

    <Toast />

    <Card class="mt-3 min-h-screen">
      <template #title>
        Published News - 
        <span v-if="news" class="text-gray-400">{{ news.articlesCount }} results</span>
        <Divider/>
      </template>
      <template #content>
        <DataView v-if="news" :value="news.articles" paginator :rows="5">
          <template #list="slotProps">
            <div v-for="(article, index) in slotProps.items" :key="index">
              <NewsArticleCard
                :article="article"
                :loading="loading"
                :categories="categories"
                @success-msg="(message) => showToast(message)"
              />
            </div>
          </template>
        </DataView>
      </template>
    </Card>
  </AdminLayout>
</template>

<script setup>
import NewsArticleCard from '@/components/cards/NewsArticleCard.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import router from '@/router';

// const props = defineProps(['successMsg'])

const toast = useToast();

const news = ref(null)
const categories = ref(null)
const loading = ref(false)

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

const getCategories = async () => {
  try {
    const response = await axios.get('api/category')

    if (response.status === 200) {
      categories.value = response.data.categories;
    }
  } catch (error) {
    console.log(error);
  }
}

const showToast = ($message) => {
  toast.add({ severity: 'info', summary: 'Info', detail: $message, life: 5000 });

  getNews();
};

onMounted(() => {
  getNews();
  getCategories();
})
</script>