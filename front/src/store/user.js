import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async signUp(name, surname, email, password) {
      const newUser = {
        name: name,
        surname: surname,
        email: email,
        password: password,
      };
      await axios.put(import.meta.env.VITE_SIGNUP_USER, newUser);
    },
    async signIn(email, password) {
      const res = await axios.post(import.meta.env.VITE_BASE_URL + "auth/login", { email: email, password: password });
      this.token = res.data.token;
      this.user = res.data.user;
    },
  },
});
