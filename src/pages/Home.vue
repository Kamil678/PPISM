<template>
  <div class="page">
    <p>Strona główna</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import createInstance from '../services/apiBase';

const instance = createInstance()
const response = instance.get('/test')
console.log(response)
</script>

<style lang="scss"></style>
