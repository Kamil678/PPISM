<template>
  <router-view />
</template>
<script setup>
import LeftMenu from "./components/LeftMenu.vue";
import TopMenu from "./components/TopMenu.vue";
import { ref } from "vue";
import { useUserStore } from "./store/user";

const closeLeftMenu = ref(false);
setInterval(() => {
  console.log(useUserStore().token);
}, 3000);
</script>

<style scoped></style>
