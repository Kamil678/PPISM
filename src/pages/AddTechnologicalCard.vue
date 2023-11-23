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
      <div v-if="exampleRows.length > 0" v-for="row in exampleRows" class="rows-wrap">
        <div class="operation-number">
          {{ row.operationNumber }}
        </div>
        <div class="operation-content">
          {{ row.operationContent }}
        </div>
        <div class="position">
          {{ row.position }}
        </div>
        <div class="position-symbol">
          {{ row.positionSymbol }}
        </div>
        <div class="time-norms">
          <div>{{ row.tpz }}</div>
          <div>{{ row.tj }}</div>
          <div>{{ row.Nt }}</div>
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

const exampleRows = [
  {
    id: 1,
    operationNumber: 10,
    operationContent: 'Montować zespół uszczelnienia zespołu wału wejściowego',
    position: 'Stanowisko montażu 1',
    positionSymbol: 'SM1',
    tpz: 10,
    tj: 15,
    Nt: 5
  },
  {
    id: 2,
    operationNumber: 20,
    operationContent: 'Montować zespół uszczelnienia zespołu wału wejściowego sFNES FPKSJG SKF SDLKF DSKFJ DS JPK VFSKJV  krj vpfjv fdpjb fkjb fdkjbv',
    position: 'Stanowisko montażu 1 wdkjv sdov fdkjv afklvj fdlvjk fvjafd vksj vkjfv ksdvj kjhv ojhv kvh sdlvkj dokvh f',
    positionSymbol: 'SM1',
    tpz: 10,
    tj: 15,
    Nt: 5
  }
]

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

  .description-rows-wrap,
  .rows-wrap {
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

  .rows-wrap {
    background-color: transparent;

    &>div {
      font-weight: 400;
    }

    .time-norms {
      display: flex;
      flex-direction: row;
      align-items: center;

      &>div {
        min-height: 100%;
        width: calc(100% / 3);
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 2px solid #000;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
