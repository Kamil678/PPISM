<template>
  <div class="page">
    <div class="wrap-add-project">
      <input-component
        v-model="textareaValue"
        placeholder="Wpisz tytuł projektu">Tytuł projektu</input-component>
    </div>
  </div>
</template>

<script setup>
import InputComponent from '../components/InputComponent.vue';

</script>

<style lang="scss">
.wrap-add-project {
  margin: 0 auto;
  height: 800px;
  width: 600px;
  background-color: $light;
  border-radius: 10px;
  padding: 30px;
}
</style>
