<template>
  <q-btn v-bind="$attrs" class="button-with-icon">
    <slot></slot>
    <q-tooltip v-if="isTooltip"> {{ tooltipText }}</q-tooltip>
  </q-btn>
</template>

<script setup>
const props = defineProps({
  tooltipText: {
    type: String,
  },
  isTooltip: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.button-with-icon.q-btn {
  min-height: auto;
  padding: 0;
  background: transparent;

  &::before,
  &:active::before {
    box-shadow: none !important;
  }

  .q-focus-helper {
    background: transparent !important;
    opacity: 0 !important;
  }

  .q-ripple {
    display: none;
  }
}
</style>
