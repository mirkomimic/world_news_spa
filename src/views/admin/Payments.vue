<template>
  <AdminLayout>
    <DataTable
      v-if="intents"
      :value="intents.data"
      paginator
      :rows="10"
      class="w-full md:w-10/12 mx-auto"
      size="small"
    >
      <Column field="id" header="ID"></Column>
      <Column field="amount" header="Amount">
        <template #body="slotProps">
          {{ slotProps.data.amount / 100 }}
        </template>
      </Column>
      <Column field="currency" header="Currency"></Column>
      <Column field="status" header="Status"></Column>
      <Column header="Show">
        <template #body="slotProps">
          <Button
            @click="showIntentDialog(slotProps)" 
            severity="info"
            label="Show"
            icon="pi pi-eye"
            size="small"
            outlined
          />
        </template>
      </Column>
    </DataTable>
    
    <ShowPaymentIntentDialog v-model:visible="visible" :intent="selectedIntent"/>
  </AdminLayout>
</template>

<script setup>
import ShowPaymentIntentDialog from '@/components/dialogs/ShowPaymentIntentDialog.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const intents = ref(null)
const selectedIntent = ref(null)
const visible = ref(false)

const showIntentDialog = (intent) => {
  selectedIntent.value = intent
  visible.value = true
}

const getIntents = async () => {
  try {
    const response = await axios.get('/api/payment_intent');
  
    if (response.status === 200) {
      intents.value = response.data.intents;
    }
  } catch (error) {
    console.log(error);    
  }
}

onMounted(() => {
  getIntents();
})
</script>
