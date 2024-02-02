<template>
  <div class="min-h-screen flex items-center bg-cover" style="background-image: url('images/news-img2.avif');">
    <Card class="min-w-[500px] mx-auto p-5 z-10 bg-black/20 backdrop-filter backdrop-blur-md">
      <template #header>
        <Image src="/images/news-icon.png" alt="Image" class="block w-[100px] mx-auto"/>
      </template>
      <template #title>
        <h2 class="text-center uppercase text-2xl text-gray-300">Login</h2>
      </template>
      <template #content>

        <Message v-if="otherError" severity="error" class="text-red-200">{{ otherError }}</Message>

        <form @submit.prevent="login" class="text-center">
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

          <div :class="{ error: v$.password.$silentErrors.length}">
            <InputText
              v-model="form.password"
              @input="v$.password.$touch"
              type="password"
              placeholder="Password"
              class="w-full bg-[#c7c9d5] text-black placeholder:text-gray-800 mt-5" 
            />
            <Transition name="fade">
              <div v-if="v$.password.$errors.length" class="text-red-500 text-sm text-start">{{ v$.password.$errors[0].$message }}</div>
            </Transition>
            <Transition name="fade">
              <div v-if="errorMsg?.password" class="text-red-500 text-sm text-start">{{ errorMsg.password[0] }}</div>
            </Transition>
          </div>

          <Button
            :loading="loading"
            :disabled="v$.$silentErrors.length"
            type="submit"
            label="Login"
            severity="info"
            class="block mt-5 mx-auto w-1/2" 
          />

          <router-link :to="{name: 'ForgotPassword'}">
            <Button label="Forgot Password?" class="block mx-auto mt-5 p-0" link/>
          </router-link>

          <div class="flex items-center justify-center">
            Not a member yet?
            <router-link :to="{name: 'Register'}">
              <Button label="Sign Up" link class="p-1"/>
            </router-link>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore()

const router = useRouter()
const errorMsg = ref(null) // server
const otherError = ref(null) // server
const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email }, 
  password: {
    required
  }
}

const v$ = useVuelidate(rules, form)

const login = async () => {
  try {
    loading.value = true

    const response = await axios.post('/login', { ...form })

    if (response) {
      setTimeout(async () => {
        loading.value = false
        await authStore.getUser()
        router.push({ name: 'Home' });
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