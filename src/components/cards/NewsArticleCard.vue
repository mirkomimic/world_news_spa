<template>
  <div v-if="props.loading">
    <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
    <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
    <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
  </div>

  <Card v-else class="m-3 shadow-none bg-transparent">
    <template #title>
      <router-link :to="`/article/${props.article.id}`" class="hover:underline">
        {{ props.article.title }}
      </router-link>
    </template>
    <template #subtitle>
      {{ props.article.author }}
    </template>
    <template #content>
      <div v-html="props.article.content" class="multiline-ellipsis"></div>
    </template>
    <template #footer>
      <div class="flex">
        <div>
          <div>
            {{ moment(props.article.created_at).startOf('minute').fromNow() }}
          </div>
          <div>
            <a :href="props.article.url" target="_blank">
              <Button label="Source" link class="p-0" />
            </a>
          </div>
        </div>
        <div v-if="authStore.user.is_admin" class="ms-auto flex gap-3">
          <EditNewsDialog
            :article="props.article"
            :categories="props.categories"
            @success-msg="(message) => $emit('successMsg', message)" 
          />
          <DeleteNewsDialog
            :article-id="props.article.id"
            @success-msg="(message) => $emit('successMsg', message)"
          />
        </div>
      </div>
    </template>
  </Card>
  <Divider/>
</template>

<script setup>
import moment from "moment";
import EditNewsDialog from "../dialogs/EditNewsDialog.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import DeleteNewsDialog from "../dialogs/DeleteNewsDialog.vue";
import { useAuthStore } from "@/stores/auth";

const toast = useToast();
const authStore = useAuthStore()

const props = defineProps(['article', 'loading', 'categories'])
const emit = defineEmits(['successMsg'])

</script>

<style scoped>
.multiline-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>