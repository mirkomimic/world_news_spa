<template>
  <div class="min-h-screen flex items-center bg-cover" style="background-image: url('images/news-img2.avif');">
    <Card class="min-w-[500px] mx-auto p-5 z-10 bg-black/20 backdrop-filter backdrop-blur-md">
      <template #header>
        <Image src="images/news-icon.png" alt="Image" class="block w-[100px] mx-auto"/>
      </template>
      <template #title>
        <h2 class="text-center uppercase text-2xl text-gray-300">Sign Up</h2>
      </template>
      <template #content>

        <Message v-if="otherError" severity="error" class="text-red-200">{{ otherError }}</Message>

        <form @submit.prevent="register" class="text-center">
          <div :class="{ error: v$.name.$silentErrors.length}">
            <InputText
              v-model="form.name"
              @input="v$.name.$touch"
              type="text"
              placeholder="Name"
              class="w-full bg-[#c7c9d5] text-black placeholder:text-gray-800"
            />
            <Transition name="fade">
              <div v-if="v$.name.$errors.length" class="text-red-500 text-sm text-start">{{ v$.name.$errors[0].$message }}</div>
            </Transition>
            <Transition name="fade">
              <div v-if="errorMsg?.name" class="text-red-500 text-sm text-start">{{ errorMsg.name[0] }}</div>
            </Transition>
          </div>

          <div :class="{ error: v$.email.$silentErrors.length}">
            <InputText
              v-model="form.email"
              @input="v$.email.$touch"
              type="text"
              placeholder="Email"
              class="w-full bg-[#c7c9d5] text-black placeholder:text-gray-800 mt-5"
            />
            <Transition name="fade">
              <div v-if="v$.email.$errors.length" class="text-red-500 text-sm text-start">{{ v$.email.$errors[0].$message }}</div>
            </Transition>
            <Transition name="fade">
              <div v-if="errorMsg?.email" class="text-red-500 text-sm text-start">{{ errorMsg.email[0] }}</div>
            </Transition>
          </div>

          <div :class="{ error: v$.password.$silentErrors.length}">
            <Password
              v-model="form.password"
              @input="v$.password.$touch"
              type="password"
              placeholder="Password"
              class="passwordFix w-full mt-5" 
              inputClass="w-full bg-[#c7c9d5] text-black placeholder:text-gray-800"
              :feedback="false"
              toggleMask
            />
            <Transition name="fade">
              <div v-if="v$.password.$errors.length" class="text-red-500 text-sm text-start">{{ v$.password.$errors[0].$message }}</div>
            </Transition>
            <Transition name="fade">
              <div v-if="errorMsg?.password" class="text-red-500 text-sm text-start">{{ errorMsg.password[0] }}</div>
            </Transition>
          </div>

          <div :class="{ error: v$.password_confirmation.$silentErrors.length}">
            <InputText
              v-model="form.password_confirmation"
              @input="v$.password_confirmation.$touch"
              type="password"
              placeholder="Confirm Password"
              class="w-full bg-[#c7c9d5] text-black placeholder:text-gray-800 mt-5" 
            />
            <Transition name="fade">
              <div v-if="v$.password_confirmation.$errors.length" class="text-red-500 text-sm text-start">{{ v$.password_confirmation.$errors[0].$message }}</div>
            </Transition>
          </div>

          <Button
            :loading="loading"
            :disabled="v$.$silentErrors.length"
            type="submit"
            label="Sign Up"
            severity="info"
            class="block mt-5 mx-auto w-1/2" 
          />

          <div class="flex items-center justify-center mt-3">
            Already have an account?
            <router-link :to="{name: 'Login'}">
              <Button label="Login" class="p-1" link/>
            </router-link>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, helpers, minLength } from '@vuelidate/validators'
import axios from 'axios';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const errorMsg = ref(null) // server
const otherError = ref(null) // server
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const rules = {
  name: {
    required,
    regex: helpers.withMessage('Enter alphabets only', helpers.regex(/^[a-zA-Z]*$/)),
    minLength: minLength(3)
  },
  email: {
    required,
    email
  }, 
  password: {
    required,
    regex: helpers.withMessage('Enter alphabets only', helpers.regex(/^[a-zA-Z]*$/))
  },
  password_confirmation: {
    sameAs: sameAs(computed(() => form.password))
  }
}

const v$ = useVuelidate(rules, form)

const register = async () => {
  try {
    loading.value = true
    const response = await axios.post('/register', { ...form });

    if (response) {
      setTimeout(() => {
        loading.value = false
        router.push({ name: 'Home' });
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    loading.value = false
    errorMsg.value = error.response.data.errors
    if (!errorMsg.value) otherError.value = 'Error'
  }
}
</script>

<style scoped>
.passwordFix::v-deep() .p-icon {
  color: black;
}
</style>