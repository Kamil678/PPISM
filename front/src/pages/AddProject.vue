<template>
  <div class="page">
    <div class="wrap-add-project">
      <h1>Nowy projekt</h1>
      <input-component
        v-model="textareaValue"
        placeholder="Wpisz tytuł projektu"
        >Tytuł projektu:</input-component
      >
    </div>
  </div>
</template>

<script setup>
import InputComponent from "../components/InputComponent.vue";
</script>

<style lang="scss">
.wrap-add-project {
  margin: 0 auto;
  height: auto;
  width: 600px;
  background-color: $light;
  border-radius: 10px;
  padding: 30px;

  h1 {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
