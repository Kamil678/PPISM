<template>
  <q-btn class="tooltip">
    <i class="bx bx-question-mark"></i>
    <q-tooltip> {{ tooltipText }}</q-tooltip>
  </q-btn>
</template>

<script setup>
defineProps({
  tooltipText: String,
});
</script>

<style lang="scss">
.tooltip.q-btn {
  width: 15px;
  min-height: 15px;
  height: 15px;
  background-color: $dark-grey;
  color: $light;
  padding: 0 2px;
  border-radius: 50%;
  cursor: inherit;

  .bx {
    font-size: 12px;
  }
}

.q-tooltip {
  background: #000 !important;
  color: $light;
}
</style>
