<template>
  <q-layout view="lhr lpr lfr">
    <q-page-container>
      <q-page>
        <left-menu :close-menu="closeLeftMenu" />
        <top-menu @click-hide-menu="closeLeftMenu = !closeLeftMenu" />
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LeftMenu from "../components/LeftMenu.vue";
import TopMenu from "../components/TopMenu.vue";
import { ref } from "vue";

const closeLeftMenu = ref(false);
</script>

<style lang="scss">

</style>
