<template>
  <div class="page">
    Add instruction cards

    <div class="preview-instruction-cards">
      <div class="header">
        <div class="document-title label">
          <p>Karta instrukcyjna montażu</p>
        </div>
        <div class="other-info">
          <div class="product-info">
            <div class="label">Nazwa wyrobu/Symbol wyrobu/Nr rys. serii złożeniowego</div>
            <div class="data">Reduktor walcowy/RW/06</div>
          </div>
          <div class="series-number">
            <div class="label">Ilość serii</div>
            <div class="data">100 szt</div>
          </div>
        </div>
      </div>
      <div class="assembly-operation-info-wrap">
        <div class="operation-content">
          <div class="label">Treść operacji</div>
          <div class="data">Montaż Zespołu Docisku Wału Wejściowego(ZDWEJ)</div>
        </div>
        <div class="operation-number">
          <div class="label">Nr operacji</div>
          <div class="data">30</div>
        </div>
        <div class="department">
          <div class="label">Wydział/Stanowisko robocze</div>
          <div class="data">Montażu/ Stanowisko Montażu 3 SM3</div>
        </div>
        <div class="position-symbol">
          <div class="label">Nazwa montowanej jednostki montażowej</div>
          <div class="data">-</div>
        </div>
      </div>
      <div class="description-rows-wrap">
        <div class="setting">
          <p>
            Ustawienie
          </p>
        </div>
        <div class="position">
          <p>
            Pozycja
          </p>
        </div>
        <div class="procedure">
          <p>
            Zabieg
          </p>
        </div>
        <div class="action">
          <p>
            Czynność
          </p>
        </div>
        <div class="action-content">
          Treść czynności montażowej pomocniczej/głównej/kontrolno-pomiarowej
        </div>
        <div class="assembly-tool">
          Narzędzie montażowe/pomiarowo-kontrolne
        </div>
        <div class="parameters">
          Parametry realizacji połączenia montażowego
        </div>
        <div class="time-1">
          tg [s]
        </div>
        <div class="time-2">
          tp [s]
        </div>
      </div>
      <!-- <div v-if="exampleRows.length > 0" v-for="row in exampleRows" class="rows-wrap">
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
      </div> -->
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
.preview-instruction-cards {
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
      width: 50%;
      text-align: center;
      border-right: 2px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;

      .data {
        font-weight: 400;
      }

      &:last-child {
        border-right: none;
      }
    }

    .document-title {
      font-size: 20px;
    }

    .other-info {
      display: flex;
      align-items: center;

      .product-info {
        width: 85%;
        border-right: 2px solid #000;
      }

      .series-number {
        width: 15%;
      }

      .product-info,
      .series-number {
        height: 100%;

        &>div {
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          &:first-child {
            border-bottom: 2px solid #000;
          }
        }
      }
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

    .label {
      background-color: $dark-grey;
    }
  }

  .assembly-operation-info-wrap {
    min-height: 100px;
    border-bottom: 2px solid #000;
    display: flex;

    &>div {
      min-height: 100%;
      width: calc(100% / 5);
      text-align: center;
      border-right: 2px solid #000;
      display: flex;
      flex-direction: column;
      font-weight: 500;

      .data {
        font-weight: 400;
      }

      &:last-child {
        border-right: none;
      }

      .label {
        background-color: $dark-grey;
      }

      &>div {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
          border-bottom: 2px solid #000;
        }
      }
    }

    .operation-number {
      width: 7%;
    }

    .operation-content {
      flex-grow: 1;
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

      &:last-child {
        border-right: none;
      }
    }

    .setting,
    .position,
    .procedure,
    .action {
      width: 3%;

      p {
        transform: rotate(270deg);
      }
    }

    .time-1,
    .time-2 {
      width: 5%;
    }

    .action-content {
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
