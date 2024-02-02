<template>
  <div class="min-h-screen flex items-center bg-cover" style="background-image: url('images/news-img2.avif');">
    <Card class="min-w-[500px] mx-auto p-5 z-10 bg-black/20 backdrop-filter backdrop-blur-md">
      <template #header>
        <Image src="/images/news-icon.png" alt="Image" class="block w-[100px] mx-auto"/>
      </template>
      <template #title>
        <h2 class="text-center text-2xl text-gray-300">Forgot Password</h2>
      </template>
      <template #content>

        <Message v-if="otherError" severity="error" class="text-red-200">{{ otherError }}</Message>
        <Message v-if="successMsg" severity="success" class="">{{ successMsg }}</Message>

        <form @submit.prevent="forgotPassword" class="text-center">
          <div :class="{ error: v$.email.$silentErrors.length}">
            <InputText
              v-model="form.email"
              @input="v$.email.$touch"
              type="email"
              placeholder="Email"
              class="w-full bg-[#c7c9d5] text-black placeholder:text-gray-800"
            />
            <Transition name="fade">
              <div v-if="v$.email.$errors.length" class="text-red-500 text-sm text-start">{{ v$.email.$errors[0].$message }}</div>
            </Transition>
            <Transition name="fade">
              <div v-if="errorMsg?.email" class="text-red-500 text-sm text-start">{{ errorMsg.email[0] }}</div>
            </Transition>
          </div>

          <Button
            :loading="loading"
            :disabled="v$.$silentErrors.length"
            type="submit"
            label="Submit"
            severity="info"
            class="block mt-5 mx-auto w-1/2" 
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios';
import { ref } from 'vue';

const errorMsg = ref(null) // server
const otherError = ref(null) // server
const successMsg = ref(null)
const loading = ref(false)

const form = ref({
  email: '',
})

const rules = {
  email: { required, email },
}

const v$ = useVuelidate(rules, form)

const forgotPassword = async () => {
  try {
    loading.value = true
    const response = await axios.post('/forgot-password', { ...form.value });

    if (response) {
      console.log(response);

      setTimeout(() => {
        loading.value = false
        form.value.email = ''
        successMsg.value = response.data.status
      }, 2000);
    }
  } catch (error) {
    setTimeout(() => {
      console.log(error);
      loading.value = false
      errorMsg.value = error.response.data.errors
      if (!errorMsg.value) otherError.value = 'Error'
    }, 2000);
  }
}

</script>