<template>
  <div class="basic-select">
    <span class="label">
      <slot></slot>
    </span>
    <q-select
      :model-value="modelValue"
      :options="optionsList"
      @update:modelValue="(value) => $emit('update:modelValue', v)"
      v-bind="$attrs"
      label="Wybierz"
      outlined>
      <template v-if="selectPart" v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label style="font-weight: 500;">{{ scope.opt.label }}</q-item-label>
            <div style="display: flex; align-items: center;">
              <div style="display: flex; align-items: center; gap: 0 5px;">
                <p>Numer z rysunku złożeniowego: </p>
                <p>{{ scope.opt.numberFromAssemblyDrawing }}</p>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Object | String,
  optionsList: Array,
  selectPart: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss">
.basic-select {
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
}
</style>
