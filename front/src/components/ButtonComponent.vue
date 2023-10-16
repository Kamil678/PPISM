<template>
  <q-btn class="basic-button" v-bind="$attrs">
    <slot></slot>
  </q-btn>
</template>

<script setup></script>

<style lang="scss">
.basic-button.q-btn {
  height: 36px;
  padding: 5px 16px;
  border-radius: 10px;
  background: $primary;
  color: $light;
  text-transform: inherit;

  &.q-btn--outline {
    border: 2px solid $primary;
    color: $primary;

    &::before {
      border: none;
    }
  }

  &.q-btn--flat {
    background: transparent;
    color: $primary;

    .q-focus-helper {
      background: transparent !important;
      opacity: 0 !important;
    }
  }
}
</style>
