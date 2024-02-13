<template>
  <div class="card flex justify-content-center m-3">
    <Sidebar v-model:visible="visible" header="Navigation">
      <PanelMenu
        :model="items"
        :pt="{
          panel: {class: 'border-0'} 
        }"
      />
    </Sidebar>
    <Button icon="pi pi-bars" severity="secondary" @click="visible = true" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const visible = ref(false);

const router = useRouter();

const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    command: () => {
      router.push({name: 'Dashboard'});
    }
  },
  {
    label: 'News',
    icon: 'pi pi-globe',
    items: [
      {
        label: 'NewsAPI',
        icon: 'pi pi-folder-open',
        command: () => {
          router.push({name: 'DashboardNewsApi'});
        }
      },
      {
        label: 'Published',
        icon: 'pi pi-folder-open',
        command: () => {
          router.push({name: 'DashboardPublishedNews'});
        }
      },
    ]
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    url: 'https://vuejs.org/'
  }
]);
</script>