<template >
  <left-menu :close-menu="closeLeftMenu" />
  <top-menu @click-hide-menu="closeLeftMenu = !closeLeftMenu" />
  <router-view />
</template>
<script setup>
import LeftMenu from "./components/LeftMenu.vue";
import TopMenu from "./components/TopMenu.vue";
import { ref } from "vue";

const closeLeftMenu = ref(false);
</script>

<style scoped></style>
