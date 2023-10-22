<template>
  <q-layout view="lhr lpr lfr">
    <q-page-container>
      <q-page class="auth-page">
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style lang="scss">
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
