<template>
  <div class="page">
    <p>Projekty</p>
    <button-component outline v-close-popup @click="router.replace('/add-project')">Stwórz projekt</button-component>
  </div>
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue';
import router from '../router';

</script>

<style lang="scss"></style>
