<template>
  <nav class="top-menu">
    <i class="bx bx-menu"></i>
    <logo-component />
  </nav>
</template>

<script setup>
import LogoComponent from "./LogoComponent.vue";
</script>

<style lang="scss">
.top-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $light;
}
</style>
