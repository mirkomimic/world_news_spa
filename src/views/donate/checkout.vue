<template>
  <MainLayout>
    <h1 class="text-3xl text-center mt-3">Donate</h1>

    <div class="h-[calc(100vh-100px)]">

      <div class="w-full md:w-1/2 mt-5 mx-auto">
        <form id="payment-form">
          <div id="payment-element">
            <!-- Elements will create form elements here -->
          </div>
          <Button type="submit" id="submit" class="mt-3">Submit</Button>
          <div id="error-message">
            <!-- Display error message to your customers here -->
          </div>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const loading = ref(false)

onMounted(() => {

  const stripe = Stripe('pk_test_51NRtV0KnRuwVl5IvfPH8T24zLnFKxdiLuZwgmFAQjaeWBgmbHyaErJjJibeaKCLvqgaa9JI0nQu4Am4iT0PiRidc00MWk8xoZz');
  
  const options = {
    clientSecret: authStore.intentSecret,
    // Fully customizable with appearance API.
    appearance: {
      theme: 'night'
    },
  };
  
  // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in a previous step
  const elements = stripe.elements(options);
  
  // Create and mount the Payment Element
  const paymentElement = elements.create('payment');
  
  
  paymentElement.mount('#payment-element');
    
  const form = document.getElementById('payment-form');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/donate/success',
      },
    });
  
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      const messageContainer = document.querySelector('#error-message');
      messageContainer.textContent = error.message;
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      // authStore.intentSecret = ''
    }
  });

})

</script>