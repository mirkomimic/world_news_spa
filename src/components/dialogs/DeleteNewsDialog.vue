<template>
  <div>
    <Button
      @click="visible = true" 
      severity="danger"
      label="Delete"
      icon="pi pi-trash"
      size="small"
      outlined
    />
    <Dialog
      v-model:visible="visible"
      modal
      header="Delete article"
      class="w-10/12 lg:w-4/12"
      :draggable="false"
    >
      <span class="p-text-secondary block mb-5">Are you sure?</span>
      <template #footer>
        <div class="flex justify-end gap-3">
          <Button
            @click="visible = false"
            label="Close"
            size="small"
            severity="secondary" 
          />
          <Button
            @click="deleteArticle(props.articleId)"
            :loading="loading"
            :disabled="loading"
            label="Confirm"
            size="small" 
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps(['articleId'])
const emit = defineEmits(['successMsg'])

const visible = ref(false);
const loading = ref(false);

const deleteArticle = async (id) => {
  try {
    loading.value = true
    const response = await axios.delete(`/api/news/${id}`);

    if (response.status === 200) {
      setTimeout(() => {
        emit('successMsg', response.data.message)
        loading.value = false
        visible.value = false
      }, 2000)
    }
  } catch (error) {
    console.log(response);
  }
}
</script>