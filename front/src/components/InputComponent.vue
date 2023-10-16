<template>
  <div class="basic-input">
    <span class="label">
      <slot></slot>
    </span>
    <q-input
      outlined
      :model-value="modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', v)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
});
</script>

<style lang="scss">
.basic-input {
  .label {
    color: $dark;
    font-weight: 500;
  }

  .q-field {
    .q-field__control {
      background-color: $light;
      height: 40px;

      &::before {
        border: 2px solid $dark;
      }
    }
  }
}
</style>
