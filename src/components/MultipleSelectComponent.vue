<template>
  <div class="basic-multiple-select">
    <span class="label">
      <slot></slot>
    </span>
    <q-select
      :model-value="modelValue"
      :options="optionsList"
      @update:modelValue="(value) => $emit('update:modelValue', v)"
      v-bind="$attrs"
      label="Wybierz"
      outlined
      multiple>
      <template v-slot:no-option>
        {{ noOptionText }}
      </template>
    </q-select>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Array,
  optionsList: Array,
  noOptionText: String
});
</script>

<style lang="scss">
.basic-multiple-select {
  width: 100%;

  .label {
    color: $dark;
    font-weight: 500;
  }

  .q-field {
    min-width: 200px;

    .q-field__control {
      background-color: $light;
      height: 40px;
      min-height: 40px;

      &::before {
        border: 2px solid $dark;
      }

      .q-field__control-container {
        padding-top: 18px;
      }
    }

    .q-field__label {
      top: 12px;
    }

    .q-field__append {
      height: 40px;
      min-height: 40px;
    }
  }

  .no-data {
    padding: 10px 20px;
    text-align: center;
  }
}
</style>
