import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    authUser: null,
    intentSecret: '',
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getToken() {
      await axios.get('/sanctum/csrf-cookie');
    },
    async getUser() {
      this.getToken();
      try {
        const response = await axios.get('/api/user')
        if (response) {
          this.authUser = response.data
        }
      } catch (error) {
        console.log(error);
        this.authUser = null
      }
    },
    async handleLogin(form) {
      await this.getToken()
      const response = await axios.post('/login', { ...form })        

      return response
    },
    async handleRegister(form) { 
      await this.getToken();
      const response = await axios.post('/register', { ...form });

      return response
    },
    async handleLogout() {
      const response = await axios.post('/logout');
      if (response) {
        this.authUser = null;
      }
      return response
    },
  }
})