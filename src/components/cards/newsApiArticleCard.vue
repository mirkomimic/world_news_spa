<template>
  <div v-if="props.loading">
    <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
    <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
    <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
  </div>

  <Card v-else class="m-3 shadow-none">
    <template #title>
      {{ props.article.title }}
    </template>
    <template #subtitle>
      {{ props.article.author }}
    </template>
    <template #content>
      {{ props.article.content }}
    </template>
    <template #footer>
      <div>
        {{ moment(props.article.publishedAt).startOf('minute').fromNow() }}
      </div>
      <div>
        <a :href="props.article.url" target="_blank">
          <Button label="Read full article" link class="p-0" />
        </a>
      </div>
    </template>
  </Card>
  <Divider/>
</template>

<script setup>
import moment from "moment";

const props = defineProps(['article', 'loading'])
</script>