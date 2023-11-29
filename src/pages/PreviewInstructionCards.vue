<template>
  <div class="page">
    <div>
      <h3 style="font-size: 24px; line-height: 26px; margin: 30px 0 20px 0">
        Podgląd kart instrukcyjnych:
      </h3>
      <div v-for="operation in operations" class="preview-instruction-cards">
        <div class="header">
          <div class="document-title label">
            <p>Karta instrukcyjna montażu</p>
          </div>
          <div class="other-info">
            <div class="product-info">
              <div class="label">Nazwa wyrobu/Symbol wyrobu/Nr rys. serii złożeniowego</div>
              <div class="data">{{ project.product.name }}/{{ getFirstLetters(project.product.name) }}/{{ project.product.numberFromAssemblyDraw }}</div>
            </div>
            <div class="series-number">
              <div class="label">Ilość serii</div>
              <div class="data">{{ project.product.seriesSize }} szt</div>
            </div>
          </div>
        </div>
        <div class="assembly-operation-info-wrap">
          <div class="operation-content">
            <div class="label">Treść operacji</div>
            <div class="data">{{ operation.operationContent }}</div>
          </div>
          <div class="operation-number">
            <div class="label">Nr operacji</div>
            <div class="data">{{ operation.operationNumber }}</div>
          </div>
          <div class="department">
            <div class="label">Wydział/Stanowisko robocze</div>
            <div class="data">Montażu/ {{ operation.position }} {{ operation.positionSymbol }}</div>
          </div>
          <div class="position-symbol">
            <div class="label">Nazwa montowanej jednostki montażowej</div>
            <div class="data">-</div>
          </div>
        </div>
        <div class="description-rows-wrap">
          <div class="procedure">
            <p>
              Zabieg/<br>zadanie
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
        <div v-if="operation.procedures.length > 0" v-for="(procedure, indexProcedure) in operation.procedures">
          <div v-for="action in procedure.actions" class="description-rows-wrap action-row">
            <div class="procedure">
              {{ indexProcedure + 1 }}
            </div>
            <div class="action">
              {{ action.action }}
            </div>
            <div class="action-content">
              {{ action.actionContent }}
            </div>
            <div class="assembly-tool">
              {{ action.assemblyTool }}
            </div>
            <div class="parameters">
              {{ action.parameters }}
            </div>
            <div class="time-1">
              {{ action.tg }}
            </div>
            <div class="time-2">
              {{ action.tp }}
            </div>
          </div>
        </div>
      </div>
      <q-btn @click="addNumber">Add</q-btn>
      <vue-mermaid-string :value="diagram" />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import createInstance from "../services/apiBase";
import VueMermaidString from 'vue-mermaid-string'

const diagram = ref(`
flowchart LR 
id1((1))-->id3((3))-->id4((4))-->id5((5))
id2((2))-->id6((6))
id7((7))-->id8((8))
id5((5))-->id8((8))
id6((6))-->id8((8))`)

const addNumber = () => {
  diagram.value = diagram.value + `
  id9((9))-->id8((8))
  style id9 fill:#fff, stroke:#000, color:#000, width:20px,height:20px
  `
}

const $q = useQuasar();
const route = useRoute();

const project = ref(null)
const operations = ref([]);
const projectId = ref(null);
const technologicalDocumentationsId = ref(null);
onMounted(async () => {
  projectId.value = route.params.projectId;
  if (projectId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/project/" + projectId.value);

      project.value = result.data.project;
    } catch (err) {
      console.log(err);
    }
  }

  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    technologicalDocumentationsId.value = searchParams.split("=")[1];
  }
  if (technologicalDocumentationsId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/technological-documentations/" + technologicalDocumentationsId.value);

      operations.value = result.data.technologicalDocumentations.operations;
    } catch (err) {
      console.log(err);
    }
  }
})

const getFirstLetters = (string) => {
  return string.split(' ').map(function (item) { return item[0] }).join('')
}
</script>

<style lang="scss">
.preview-instruction-cards {
  margin: 0 auto;
  border: 2px solid #000;
  width: 70%;
  margin-bottom: 50px;

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
      padding: 5px;

      .data {
        font-weight: 400;
      }

      &:first-child {
        width: 5%;
      }

      &:last-child {
        border-right: none;
      }
    }

    &.action-row {
      background-color: transparent;


      &:last-child {
        border-bottom: none;
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
      flex-grow: 2;
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
