import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getUser() {
      const response = await axios.get('/api/user')
      this.authUser = response.data
    },
    async handleLogout() {
      this.authUser = null;
    },
  }
})