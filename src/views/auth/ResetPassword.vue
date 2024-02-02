<template>
  <div class="min-h-screen flex items-center bg-cover" style="background-image: url('/images/news-img2.avif');">
    <Card class="min-w-[500px] mx-auto p-5 z-10 bg-black/20 backdrop-filter backdrop-blur-md">
      <template #header>
        <Image src="/images/news-icon.png" alt="Image" class="block w-[100px] mx-auto"/>
      </template>
      <template #title>
        <h2 class="text-center text-2xl text-gray-300">Reset Password</h2>
      </template>
      <template #content>

        <Message v-if="otherError" severity="error" class="text-red-200">{{ otherError }}</Message>
        <Message v-if="successMsg" severity="success" class="">{{ successMsg }}</Message>

        <form @submit.prevent="resetPassword" class="text-center">
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
import { required, sameAs, helpers } from '@vuelidate/validators'
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const errorMsg = ref(null) // server
const otherError = ref(null) // server
const successMsg = ref(null)
const loading = ref(false)

const form = ref({
  password: '',
  password_confirmation: '',
  email: route.query.email,
  token: route.params.token
})

const rules = {
  password: {
    required,
    regex: helpers.withMessage('Enter alphabets only', helpers.regex(/^[a-zA-Z]*$/))
  },
  password_confirmation: {
    sameAs: sameAs(computed(() => form.value.password))
  }
}

const v$ = useVuelidate(rules, form)

const resetPassword = async () => {
  try {
    loading.value = true
    const response = await axios.post('/reset-password', { ...form.value });

    if (response) {
      setTimeout(() => {
        loading.value = false
        form.value.password = ''
        form.value.password_confirmation = ''
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

<style scoped>
.passwordFix::v-deep() .p-icon {
  color: black;
}
</style>