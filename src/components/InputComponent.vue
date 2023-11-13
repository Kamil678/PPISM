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
  modelValue: String | Number,
});
</script>

<style lang="scss">
.basic-input {
  width: 100%;
  .label {
    color: $dark;
    font-weight: 500;
  }

  .q-field {
    width: 100%;
    .q-field__control {
      background-color: $light;
      height: 40px;

      &::before {
        border: 2px solid $dark;
      }
    }
  }

  .q-textarea.q-field {
    .q-field__control {
      background-color: $light;
      min-height: 40px;
      height: auto;

      // &::before {
      //   border: 2px solid $dark;
      // }
    }

    .q-field__native {
      padding-top: 10px;
      min-height: 40px;
    }
  }
}
</style>
