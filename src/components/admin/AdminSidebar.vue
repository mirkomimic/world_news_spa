<template>
  <div class="card flex justify-content-center m-3">
    <Sidebar v-model:visible="visible" header="Navigation">
      <Menu :model="items" class="border-0">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
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
    route: { name: 'Dashboard' }
  },
  {
    label: 'News',
    icon: 'pi pi-folder',
    command: () => {
      router.push({name: 'DashboardNews'});
    }
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    url: 'https://vuejs.org/'
  }
]);
</script>