<template>
  <nav class="top-menu">
    <button-with-icon
      is-tooltip
      tooltip-text="Schowaj boczne menu"
      @click="$emit('clickHideMenu')"
      class="hide-menu"
    >
      <i class="bx bx-menu"></i>
    </button-with-icon>
    <logo-component />
  </nav>
</template>

<script setup>
import LogoComponent from "./LogoComponent.vue";
import ButtonWithIcon from "./ButtonWithIcon.vue";

defineEmits(["clickHideMenu"]);
</script>

<style lang="scss">
.top-menu {
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: $light;

  @media (min-width: 768px) {
    justify-content: space-between;
  }

  .hide-menu {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
}
</style>
