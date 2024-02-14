<template>
  <div>
    <Button
      @click="visible = true" 
      severity="info"
      label="Edit"
      icon="pi pi-pencil"
      size="small"
      outlined
    />
    <Dialog
      v-model:visible="visible"
      modal
      header="Create News"
      class="w-11/12 lg:w-8/12"
      :draggable="false"
    >
      <Message v-if="otherError" severity="error" class="text-red-200">{{ otherError }}</Message>

      <form class="text-center" @submit.prevent="edit(props.article.id)">

        <div :class="{ error: v$.author.$silentErrors.length}">
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <label for="author" class="justify-self-end me-3">Author:</label>
            <InputText
              v-model="form.author"
              placeholder="Author"
              id="author"
              type="text"
              class="w-full me-auto col-span-5"
            />
          </div>
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <div></div>
            <div class="col-span-5">
              <Transition name="fade">
                <div v-if="v$.author.$errors.length" class="text-red-500 text-sm text-start">{{ v$.author.$errors[0].$message }}</div>
              </Transition>
              <Transition name="fade">
                <div v-if="errorMsg?.author" class="text-red-500 text-sm text-start">{{ errorMsg.author[0] }}</div>
              </Transition>
            </div>
          </div>
        </div>

        <div :class="{ error: v$.title.$silentErrors.length}">
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <label for="title" class="justify-self-end me-3">Title:</label>
            <InputText
              v-model="form.title"
              placeholder="Title"
              id="title"
              type="text"
              class="w-full me-auto col-span-5"
            />
          </div>
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <div></div>
            <div class="col-span-5">
              <Transition name="fade">
                <div v-if="v$.title.$errors.length" class="text-red-500 text-sm text-start">{{ v$.title.$errors[0].$message }}</div>
              </Transition>
              <Transition name="fade">
                <div v-if="errorMsg?.title" class="text-red-500 text-sm text-start">{{ errorMsg.title[0] }}</div>
              </Transition>
            </div>
          </div>
        </div>

        <div :class="{ error: v$.url.$silentErrors.length}">
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <label for="url" class="justify-self-end me-3">URL:</label>
            <InputText
              v-model="form.url"
              placeholder="URL"
              type="text"
              class="w-full me-auto col-span-5"
            />
          </div>
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <div></div>
            <div class="col-span-5">
              <Transition name="fade">
                <div v-if="v$.url.$errors.length" class="text-red-500 text-sm text-start">{{ v$.url.$errors[0].$message }}</div>
              </Transition>
              <Transition name="fade">
                <div v-if="errorMsg?.url" class="text-red-500 text-sm text-start">{{ errorMsg.url[0] }}</div>
              </Transition>
            </div>
          </div>
        </div>

        <div :class="{ error: v$.category.$silentErrors.length}">
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <label for="category" class="justify-self-end me-3">Category:</label>
            <Dropdown
              v-model="form.category"
              placeholder="-"
              :options="props.categories" 
              optionLabel="name"
              optionValue="id"
              class="w-full me-auto col-span-5 text-start"
            />
          </div>
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <div></div>
            <div class="col-span-5">
              <Transition name="fade">
                <div v-if="v$.category.$errors.length" class="text-red-500 text-sm text-start">{{ v$.category.$errors[0].$message }}</div>
              </Transition>
              <Transition name="fade">
                <div v-if="errorMsg?.category" class="text-red-500 text-sm text-start">{{ errorMsg.category[0] }}</div>
              </Transition>
            </div>
          </div>
        </div>

        <div :class="{ error: v$.content.$silentErrors.length}" class="mb-3">
          <Editor
            v-model="form.content"
            editorStyle="height: 320px" 
            placeholder="Content"
          />
          <div class="grid grid-cols-6 items-center w-5/6 mx-auto mb-3">
            <div></div>
            <div class="col-span-6">
              <Transition name="fade">
                <div v-if="v$.content.$errors.length" class="text-red-500 text-sm text-start">{{ v$.content.$errors[0].$message }}</div>
              </Transition>
              <Transition name="fade">
                <div v-if="errorMsg?.content" class="text-red-500 text-sm text-start">{{ errorMsg.content[0] }}</div>
              </Transition>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <Button
            @click="visible = false"
            label="Close"
            size="small"
            severity="secondary" 
          />
         <Button
            :loading="loading"
            :disabled="loading"
            type="submit"
            label="Confirm"
            size="small" 
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from "axios";

const props = defineProps(['article', 'categories'])
const emit = defineEmits(['successMsg'])

const visible = ref(false);
const loading = ref(false);
const errorMsg = ref(null) // server
const otherError = ref(null) // server

const form = ref({
  author: props.article.author || null,
  title:  props.article.title || null,
  url:  props.article.url || null,
  content: props.article.content || null,
  category: props.article.category_id
})

const rules = {
  author: {  },
  title: { required }, 
  url: {  },
  content: { required }, 
  category: { required }
}

const v$ = useVuelidate(rules, form)
  
const edit = async (id) => {
  v$.value.$touch()

  if (v$.value.$silentErrors.length) return
  
  try {
    loading.value = true
    const response = await axios.put(`/api/news/${id}`, { ...form.value });

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

<style >
.toastFix {
  border-color: red !important;
}
</style>