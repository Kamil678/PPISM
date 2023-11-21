<template>
  <div class="page">
    Add Technological card

    <div class="preview-technolgical-card">
      <div class="header">
        <div class="place label">
          Politechnika Krakowska
        </div>
        <div class="title label">
          <p>Karta technologiczna montażu</p>
        </div>
        <div class="product-name">
          <div class="label">Nazwa montowanego wyrobu</div>
          <div class="data"></div>
        </div>
        <div class="picture-number">
          <div class="label">Numer rysunku złożeniowego</div>
          <div class="number"></div>
        </div>
        <div class="size-series">
          <div class="label">Wielkość serii</div>
          <div class="data"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useQuasar } from "quasar";
// import { ref, onMounted } from "vue";
// import { useRoute } from "vue-router";
// import InputComponent from "../components/InputComponent.vue";
// import ButtonComponent from "../components/ButtonComponent.vue";
// import ButtonWithIcon from "../components/ButtonWithIcon.vue";
// import ConfirmModal from "../components/ConfirmModal.vue";
// import router from "../router";
// import createInstance from "../services/apiBase";
// const $q = useQuasar();
// const route = useRoute();


</script>

<style lang="scss">
.preview-technolgical-card {
  margin: 0 auto;
  border: 2px solid #000;
  width: 70%;
  min-height: 85vh;

  .header {
    min-height: 100px;
    border-bottom: 2px solid #000;
    display: flex;

    &>div {
      min-height: 100%;
      width: calc(100% / 5);
      text-align: center;
      border-right: 2px solid #000;
    }

    .label {
      background-color: $dark-grey;
    }

    .product-name,
    .picture-number,
    .size-series {
      display: flex;
      flex-direction: column;

      .label {
        min-height: 50%;
        border-bottom: 2px solid #000;
      }
    }
  }
}
</style>
