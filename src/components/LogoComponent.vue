<template>
  <router-link to="/home" class="logo">
    <i class="bx bx-code-alt"></i>
    <div class="logo-name">
      <span>PPISM</span>
    </div>
  </router-link>
</template>

<script setup></script>

<style lang="scss">
.logo {
  font-size: 24px;
  font-weight: 700;
  height: 56px;
  display: flex;
  align-items: center;
  color: $primary;
  gap: 0 5px;
  padding: 20px;
}
</style>
