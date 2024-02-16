<template>
  <AdminLayout>
    <template #heading>Dashboard - NewsAPI</template>

    <div class="grid grid-cols-3">
      <div class="col-span-1"></div>
      <div class="col-span-1">
        <span class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText v-model="form.q" placeholder="Search" class="w-full"/>
        </span>
      </div>
      <div class="col-span-1 justify-self-end">
        <SelectCountry v-model="form.country"/>
      </div>
    </div>

    <div class="mt-3 text-center">
      <SelectButton
        v-model="form.category"
        :options="categories"
        optionLabel="name"
        optionValue="name"
      />
    </div>

    <Card class="mt-3 min-h-screen">
      <template #title>
        Top Headlines - 
        <span v-if="news" class="text-gray-400">{{ news.totalResults }} results</span>
        <Divider/>
      </template>
      <template #content>
        <NewsApiArticleCard
          v-if="news"
          v-for="(article, index) in news.articles"
          :key="index"
          :article="article" 
          :loading="loading"
          :categories="categories"
        />
        <div v-else>No Results Found!</div>
      </template>
      <template #footer>
        <Paginator
          v-if="news"
          v-model="form.page"
          @page="(event) => form.page = event.page + 1"
          :rows="form.page_size"
          :totalRecords="news.totalResults"
          :alwaysShow="false"
        />
          
        <!-- @page="(event) => form.page = event.page + 1" -->
      </template>
    </Card>

  </AdminLayout>
</template>

<script setup>
import NewsApiArticleCard from '@/components/cards/newsApiArticleCard.vue';
import SelectCountry from '@/components/form-inputs/SelectCountry.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import debounce from 'lodash.debounce';

const categories = ref(null)
const news = ref(null)
const loading = ref(false)

const router = useRouter()
const route = useRoute()

const form = ref({
  q: route.query.q || null,
  sources: null,
  country: route.query.country?.toUpperCase() || 'RS',
  category: route.query.category || 'general',
  page_size: 10,
  page: parseInt(route.query.page)
})

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

const getData = debounce(async () => {
  loading.value = true
  try {
    const response = await axios.post('/api/newsapi', 
    {
      ...form.value,
      country: form.value.country?.toLowerCase(),
    });

    if (response.status === 200) {
      news.value = response.data.news;
      loading.value = false

      router.push({
        name: 'DashboardNewsApi',
        query: {...response.data.params}
      })

    }
    
  } catch (error) {
    console.log(error);
    loading.value = false
  }
}, 1000)

onMounted( () => {
  getData();
  getCategories();
})


watch(form.value, () => {
  getData()
})

</script>

<style scoped>
.active-page {
  background-color: #db3482; /* or any color you want to use for the active page */
  color: #fff; /* text color for the active page */
}
</style>