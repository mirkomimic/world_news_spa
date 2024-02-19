<template>
  <div 
    class="bg-blue-900 top-0 z-10"
    :class="{'sticky bg-blue-900/50 backdrop-filter backdrop-blur-md': navbarScroll}"
  >
    <Menubar class="container border-0 rounded-none sticky bg-transparent mx-auto h-[50px]">
      <template #start>
        <router-link :to="{name: 'Home'}" class="flex items-center gap-3">
          <Image src="/images/news-icon.png" alt="Image" width="40" />
          <div class="font-mono font-bold me-5 text-gray-100">World News</div>
        </router-link>
      </template>
      <!-- <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template> -->
      <template #end>
        <div class="flex gap-3">
          <router-link :to="{name: 'DonateIndex'}">
            <Button label="Donate" class="border-gray-400 text-gray-100" size="small" outlined/>
          </router-link>
          <router-link v-if="authStore.user" :to="{name: 'Dashboard'}">
            <Button label="Dashboard" class="border-gray-400 text-gray-100" size="small" outlined/>
          </router-link>
          <router-link v-if="!authStore.user" :to="{name: 'Login'}">
            <Button label="Login" class="border-gray-400 text-gray-100" size="small" outlined/>
          </router-link>
          <router-link v-if="!authStore.user" :to="{name: 'Register'}">
            <Button label="Sign Up" class="border-gray-400 text-gray-100" size="small" outlined/>
          </router-link>
          <Button
            @click="toggleTheme"
            :icon="currentTheme === 'aura-dark-blue' ? 'pi pi-moon' : 'pi pi-sun'"
            severity="primary"
            size="small" 
            raised
          />

          <div v-if="authStore.user" class="flex">
            <Avatar @click="toggle" image="/images/user-placeholder.png" class="mr-2 w-[37px] h-[37px] cursor-pointer" shape="circle" aria-haspopup="true" aria-controls="overlay_menu"/>
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePrimeVue } from 'primevue/config';
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth.js';

const PrimeVue = usePrimeVue();
const menu = ref()
const router = useRouter()
const authStore = useAuthStore()
const navbarScroll = ref(false)

// const classObject = computed(() => ({
//   'bg-red-400': window.scroll > 300
// }))

// const navbarScroll = computed(() => {
//   if (window.scrollY > 350) {
//     return true
//   } else {
//     return false
//   }
// })

window.onscroll = function() {
  if (window.scrollY > 300) {
    navbarScroll.value = true
  } else {
    navbarScroll.value = false
  }

// console.log(window.scrollY);      
};

const currentTheme = ref('aura-dark-blue');

const toggleTheme = () => {
  let nextTheme = 'aura-dark-blue';

  if (currentTheme.value === 'aura-dark-blue') {
    nextTheme = 'aura-light-blue';
  }
  else if (currentTheme.value === 'aura-light-blue') {
    nextTheme = 'aura-dark-blue';
  }

  PrimeVue.changeTheme(currentTheme.value, nextTheme, 'themeLink', () => { });

  currentTheme.value = nextTheme;
}

const logout = async () => {
  
  try {
    const response = await authStore.handleLogout()
    
    if (response) {
      router.go()
    }
  } catch (error) {
    console.log(error);
  }
}

const items = ref([
  {
    label: `${authStore.user?.name}`,
    items: [
      {
        key: 1,
        label: 'Home',
        icon: 'pi pi-home',
        route: {name: 'Home'}
      },
      {
        key: 2,
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: logout
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>