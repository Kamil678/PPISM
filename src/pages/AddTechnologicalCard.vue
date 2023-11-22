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
          <div class="data">Reduktor walcowy</div>
        </div>
        <div class="picture-number">
          <div class="label">Numer rysunku złożeniowego</div>
          <div class="data">6</div>
        </div>
        <div class="size-series">
          <div class="label">Wielkość serii</div>
          <div class="data">100</div>
        </div>
      </div>
      <div class="description-rows-wrap">
        <div class="operation-number">
          Nr operacji
        </div>
        <div class="operation-content">
          Treść operacji
        </div>
        <div class="position">
          Stanowisko
        </div>
        <div class="position-symbol">
          Symbol stanowiska
        </div>
        <div class="time-norms">
          <div>Normy czasu</div>
          <div class="specific-times">
            <div>tpz</div>
            <div>tj</div>
            <div>Nt</div>
          </div>
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
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;

      .data {
        font-weight: 400;
      }
    }

    .title {
      font-size: 20px;
    }

    .product-name,
    .picture-number,
    .size-series {
      div {
        min-height: 50%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .title {
      width: 50%;
    }

    .size-series {
      border-right: none;
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

  .description-rows-wrap {
    min-height: 100px;
    border-bottom: 2px solid #000;
    display: flex;
    background-color: $dark-grey;

    &>div {
      min-height: 100%;
      width: calc(100% / 5);
      text-align: center;
      border-right: 2px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;

      .data {
        font-weight: 400;
      }
    }

    .operation-number {
      width: 7%;
    }

    .operation-content {
      flex-grow: 1;
    }

    .time-norms {
      display: flex;
      flex-direction: column;
      border-right: none;

      &>div {
        min-height: 50%;
      }

      div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .specific-times {
        border-top: 2px solid #000;
        display: flex;
        width: 100%;

        div {
          width: calc(100% / 3);
          border-right: 2px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        div:last-child {
          border-right: none !important;
        }
      }
    }
  }
}
</style>
