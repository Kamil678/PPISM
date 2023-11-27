<template>
  <div class="page">
    <div class="operations-wrap">
      <h3>Operacje montażowe:</h3>
      <q-table
        :hide-pagination="true"
        :rows-per-page-options="[0]"
        :columns="operationsColumns"
        :rows="operations"
        row-key="name"
        v-bind="$attrs"
        ref="table"
        separator="none"
        dense
        binary-state-sort
        flat
        no-data-label="Brak operacji"
        class="operations-table">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="operationNumber" :props="props">
              {{ props.row.operationNumber }}
            </q-td>
            <q-td key="operationContent" :props="props">
              {{ props.row.operationContent }}
            </q-td>
            <q-td key="position" :props="props">
              {{ props.row.position }}
            </q-td>
            <q-td key="positionSymbol" :props="props">
              {{ props.row.positionSymbol }}
            </q-td>
            <q-td key="tpz" :props="props">
              {{ props.row.tpz }}
            </q-td>
            <q-td key="tj" :props="props">
              {{ props.row.tj }}
            </q-td>
            <q-td key="Nt" :props="props">
              {{ props.row.Nt }}
            </q-td>
            <q-td key="actions" :props="props">
              <div class="flex justify-end no-wrap" style="grid-gap: 10px">
                <button-with-icon
                  is-tooltip
                  tooltip-text="Edytuj operację montażową"
                  @click=""
                  class="hide-menu">
                  <img
                    src="../assets/ic_edit.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Usuń operację montażową"
                  @click=""
                  class="hide-menu">
                  <img
                    src="../assets/trash-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <button-component
        flat
        @click="isAddNewOperation = true"
        style="padding-right: 0; align-self: flex-end;">
        <img
          src="../assets/flat-plus-ico.svg"
          style="width: 20px; height: 20px"
          alt="ad" />
        Dodaj nową operację
      </button-component>
      <div v-if="isAddNewOperation" class="add-operation-wrap">
        <input-component
          v-model="newOperation.operationContent"
          placeholder="Wpisz treść operacji"
          class="project-title mb-10">Treść operacji:</input-component>
        <input-component
          v-model="newOperation.position"
          placeholder="Wpisz stanowisko"
          class="project-title mb-10">Stanowisko:</input-component>
        <input-component
          v-model="newOperation.positionSymbol"
          placeholder="Wpisz symbol stanowiska"
          class="project-title mb-10">Symbol stanowiska:</input-component>
        <input-component
          v-model="newOperation.tpz"
          type="number"
          placeholder="Wpisz przgotowawczo-zakończeniowy"
          class="project-title mb-10">Czas przgotowawczo-zakończeniowy (tpz):</input-component>
        <input-component
          v-model="newOperation.tj"
          type="number"
          placeholder="Wpisz czas jednostkowy"
          class="project-title mb-10">Czas jednostkowy (tj):</input-component>

        <input-component
          v-model="newOperation.Nt"
          type="number"
          placeholder="Wpisz norme czasu"
          class="project-title mb-10">Norma czasu (Nt):</input-component>

        <div v-if="newOperation.procedures.length > 0">
          <p>Czynności montażowe:</p>
          <div v-for="procedure in newOperation.procedures" style="display: flex; align-items: center;justify-content: space-between;">
            <p><span>{{ procedure.action }}.</span> {{ procedure.actionContent }}</p>
            <button-with-icon
              is-tooltip
              tooltip-text="Usuń czynność"
              @click="deleteProcedure(procedure.id)"
              class="hide-menu"
              style="padding-right: 0;">
              <img
                src="../assets/trash-ico.svg"
                style="width: 18px; height: 18px"
                alt="edit" />
            </button-with-icon>
          </div>
        </div>
        <button-component
          flat
          @click="isAddProcedure = true"
          style="padding-right: 0; align-self: flex-end;">
          <img
            src="../assets/flat-plus-ico.svg"
            style="width: 20px; height: 20px"
            alt="ad" />
          Dodaj zabieg (czynność) montażową
        </button-component>
        <q-dialog
          no-esc-dismiss
          no-backdrop-dismiss
          :model-value="isAddProcedure"
          class="add-procedure">
          <q-card>
            <q-card-section>
              <div>
                <div class="mb-10">
                  <p style="margin-bottom: 5px !important;">Typ czynności:</p>
                  <q-radio dense v-model="newProcedure.actionType" val="auxiliary" label="Pomocnicza" style="margin-right: 10px;" />
                  <q-radio dense v-model="newProcedure.actionType" val="main" label="Główna" style="margin-right: 10px;" />
                  <q-radio dense v-model="newProcedure.actionType" val="control" label="Kontrolno-pomiarowa" />
                </div>
                <input-component
                  v-model="newProcedure.actionContent"
                  placeholder="Wpisz treść czynności"
                  class="project-title mb-10">Nazwa czynności:</input-component>
                <input-component
                  v-model="newProcedure.setting"
                  placeholder="Wpisz ustawinie"
                  class="project-title mb-10">Ustawienie:</input-component>
                <input-component
                  v-model="newProcedure.position"
                  placeholder="Wpisz pozycję"
                  class="project-title mb-10">Pozycja:</input-component>
                <input-component
                  v-model="newProcedure.procedure"
                  placeholder="Wpisz zabieg"
                  class="project-title mb-10">Zabieg:</input-component>
                <input-component
                  v-model="newProcedure.assemblyTool"
                  placeholder="Wpisz narzędzie montażowe/pomiarowo-kontrolne"
                  class="project-title mb-10">Narzędzie montażowe/pomiarowo-kontrolne:</input-component>
                <input-component
                  v-model="newProcedure.parameters"
                  placeholder="Wpisz parametry realizacji połączenia montażowego"
                  class="project-title mb-10">Parametry realizacji połączenia montażowego:</input-component>
                <input-component
                  v-model="newProcedure.tg"
                  type="number"
                  placeholder="Wpisz czas główny"
                  class="project-title mb-10">Czas główny (tg):</input-component>
                <input-component
                  v-model="newProcedure.tp"
                  type="number"
                  placeholder="Wpisz czas pomocnicz"
                  class="project-title mb-10">Czas pomocniczy (tp):</input-component>
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <button-component flat v-close-popup @click="cancelAddProcedure">Anuluj</button-component>
              <button-component outline @click="addProcedure">Dodaj</button-component>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div style="display: flex; justify-content: space-between;">
          <button-component
            flat
            @click="cancelAddNewOperation"
            style="padding-left: 0;">
            Anuluj
          </button-component>
          <button-component
            flat
            @click="addNewOperation"
            style="padding-right: 0;">
            Dodaj
          </button-component>
        </div>
      </div>
    </div>
    <div>
      <h3 style="font-size: 24px;line-height: 26px;margin: 30px 0 10px 0;">Podgląd karty technologicznej:</h3>
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
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";
// import ConfirmModal from "../components/ConfirmModal.vue";
// import router from "../router";
import createInstance from "../services/apiBase";

const $q = useQuasar();
const route = useRoute();

const project = ref(null);
const projectId = ref(null)
onMounted(async () => {
  projectId.value = route.params.projectId;

  if (projectId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/project/" + projectId.value);
      project.value = result.data.project
      console.log(project.value)
    } catch (err) {
      console.log(err);
    }
  }
})

const operations = ref([]);

const isAddNewOperation = ref(false);
const newOperation = ref({
  id: operations.value.length + 1,
  operationNumber: operations.value.length > 0 ? operations.value[operations.value.length - 1].operationNumber + 10 : 10,
  operationContent: '',
  position: '',
  positionSymbol: '',
  tpz: 0,
  tj: 0,
  Nt: 0,
  procedures: [],
})

const clearAllFields = () => {
  newOperation.value.id = operations.value.length + 1
  newOperation.value.operationNumber = operations.value.length > 0 ? operations.value[operations.value.length - 1].operationNumber + 10 : 10
  newOperation.value.operationContent = ''
  newOperation.value.position = ''
  newOperation.value.positionSymbol = ''
  newOperation.value.tpz = 0
  newOperation.value.tj = 0
  newOperation.value.Nt = 0
}

const isAddProcedure = ref(false);
const newProcedure = ref({
  id: newOperation.value.procedures.length + 1,
  setting: '',
  position: '',
  procedure: '',
  action: newOperation.value.procedures.length + 1,
  actionType: 'auxiliary',
  actionContent: '',
  assemblyTool: '',
  parameters: '',
  tg: 0,
  tp: 0
})

const clearNewProcedure = () => {
  newProcedure.value.id = newOperation.value.procedures.length + 1
  newProcedure.value.setting = ''
  newProcedure.value.position = ''
  newProcedure.value.procedure = ''
  newProcedure.value.action = newOperation.value.procedures.length + 1
  newProcedure.value.actionType = 'auxiliary'
  newProcedure.value.actionContent = ''
  newProcedure.value.assemblyTool = ''
  newProcedure.value.parameters = ''
  newProcedure.value.tg = ''
  newProcedure.value.tp = ''
}

const cancelAddProcedure = () => {
  isAddProcedure.value = false
  clearNewProcedure();
}

const addProcedure = () => {
  newOperation.value.procedures.push({
    id: newProcedure.value.id,
    setting: newProcedure.value.setting,
    position: newProcedure.value.position,
    procedure: newProcedure.value.procedure,
    action: newProcedure.value.action,
    actionType: newProcedure.value.actionType,
    actionContent: newProcedure.value.actionContent,
    assemblyTool: newProcedure.value.assemblyTool,
    parameters: newProcedure.value.parameters,
    tg: newProcedure.value.tg,
    tp: newProcedure.value.tp,
  });
  isAddProcedure.value = false;
  clearNewProcedure()
}

const deleteProcedure = (id) => {
  const index = newOperation.value.procedures
    .map((procedure) => {
      return procedure.id;
    })
    .indexOf(id);

  newOperation.value.procedures.splice(index, 1);
}

const cancelAddNewOperation = () => {
  isAddNewOperation.value = false
  clearAllFields();
}

const addNewOperation = () => {
  if (newOperation.value.operationContent !== '' && newOperation.value.position !== '' && newOperation.value.positionSymbol !== '') {
    operations.value.push({
      id: newOperation.value.id,
      operationNumber: newOperation.value.operationNumber,
      operationContent: newOperation.value.operationContent,
      position: newOperation.value.position,
      positionSymbol: newOperation.value.positionSymbol,
      tpz: newOperation.value.tpz,
      tj: newOperation.value.tj,
      Nt: newOperation.value.Nt
    })
    isAddNewOperation.value = false;
    clearAllFields();
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Uzupełnij wszystkie obowiązkowe pola!",
      color: "red",
    });
  }
}

const operationsColumns = [
  {
    name: "operationNumber",
    label: "Numer operacji",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.operationNumber ?? "brak",
  },
  {
    name: "operationContent",
    label: "Treść operacji",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.operationContent ?? "brak",
  },
  {
    name: "position",
    label: "Stanowisko",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.position ?? "brak",
  },
  {
    name: "positionSymbol",
    label: "Symbol stanowiska",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.positionSymbol ?? "brak",
  },
  {
    name: "tpz",
    label: "tpz",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.tpz ?? "brak",
  },
  {
    name: "tj",
    label: "tj",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.tj ?? "brak",
  },
  {
    name: "Nt",
    label: "Nt",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.Nt ?? "brak",
  },
  {
    name: "actions",
    label: "",
    align: "right",
    style: "width: 130px",
    sortable: false,
  },
]

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
.operations-wrap {
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 24px;
    line-height: 26px;
    margin-bottom: 10px;
  }

  .operations-table.q-table__container {
    background-color: transparent;
    margin-bottom: 30px;

    .q-table__bottom {
      justify-content: center;
    }
  }

  .add-operation-wrap {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
}

.add-procedure {
  .q-card {
    min-width: 700px;
  }

  .q-card__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

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
