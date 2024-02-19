<template>
  <MainLayout>
    <h1 class="text-3xl text-center mt-3">Donate</h1>

    <div class="h-[calc(100vh-100px)]">
      <div class="flex justify-center items-center text-center mt-5">
        <label for="integeronly" class="font-bold block mb-2 me-3"> Amount </label>
        <InputNumber
          v-model="formIntent.amount"
          inputId="integeronly"
          locale="de-DE"
          :minFractionDigits="2" 
        />
        <Button @click="createIntent" :loading="loading" label="Proceed" class="ms-3"/>
      </div>

    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const clientSecret2 = ref('')
const loading = ref(false)

const formIntent = ref({
  amount: null,
})

const createIntent = async () => {
  try {
    loading.value = true
    const response = await axios.post('/api/payment_intent', { ...formIntent.value });

    if (response.status === 200) {
      setTimeout(() => {
        // clientSecret2.value = response.data.client_secret
        authStore.intentSecret = response.data.client_secret
        loading.value = false
        router.push({name: 'DonateCheckout'})
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>