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
        class="operations-table"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <button-with-icon
                is-tooltip
                tooltip-text="Pokaż szczegóły projektu"
                @click="props.expand = !props.expand"
                style="padding-left: 0"
              >
                <img
                  src="../assets/plus-ico.svg"
                  style="width: 20px; height: 20px"
                  alt="ad"
                />
              </button-with-icon>
            </q-td>
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
                  class="hide-menu"
                >
                  <img
                    src="../assets/ic_edit.svg"
                    style="width: 18px; height: 18px"
                    alt="edit"
                  />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Usuń operację montażową"
                  @click="deleteOperation(props.row.id)"
                  class="hide-menu"
                >
                  <img
                    src="../assets/trash-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit"
                  />
                </button-with-icon>
              </div>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <p style="font-size: 18px">Zabiegi montażowe:</p>
              <q-table
                :hide-pagination="true"
                :rows-per-page-options="[0]"
                :columns="actionsColumns"
                :rows="props.row.actions"
                row-key="name"
                v-bind="$attrs"
                ref="table"
                separator="none"
                dense
                binary-state-sort
                flat
                no-data-label="Brak zabiegów montażowych"
                style="padding: 10px 75px"
                class="operations-table"
              >
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="setting" :props="props">
                      {{ props.row.setting }}
                    </q-td>
                    <q-td key="position" :props="props">
                      {{ props.row.position }}
                    </q-td>
                    <q-td key="procedure" :props="props">
                      {{ props.row.procedure }}
                    </q-td>
                    <q-td key="action" :props="props">
                      {{ props.row.action }}
                    </q-td>
                    <q-td key="actionType" :props="props">
                      {{ props.row.actionType }}
                    </q-td>
                    <q-td key="actionContent" :props="props">
                      {{ props.row.actionContent }}
                    </q-td>
                    <q-td key="assemblyTool" :props="props">
                      {{ props.row.assemblyTool }}
                    </q-td>
                    <q-td key="parameters" :props="props">
                      {{ props.row.parameters }}
                    </q-td>
                    <q-td key="tg" :props="props">
                      {{ props.row.tg }}
                    </q-td>
                    <q-td key="tp" :props="props">
                      {{ props.row.tp }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <button-component
        flat
        @click="isAddNewOperation = true"
        style="padding-right: 0; align-self: flex-end"
      >
        <img
          src="../assets/flat-plus-ico.svg"
          style="width: 20px; height: 20px"
          alt="ad"
        />
        Dodaj nową operację
      </button-component>
      <div v-if="isAddNewOperation" class="add-operation-wrap">
        <input-component
          v-model="newOperation.operationContent"
          placeholder="Wpisz treść operacji"
          class="project-title mb-10"
          >Treść operacji:</input-component
        >
        <input-component
          v-model="newOperation.position"
          placeholder="Wpisz stanowisko"
          class="project-title mb-10"
          >Stanowisko:</input-component
        >
        <input-component
          v-model="newOperation.positionSymbol"
          placeholder="Wpisz symbol stanowiska"
          class="project-title mb-10"
          >Symbol stanowiska:</input-component
        >
        <input-component
          v-model="newOperation.tpz"
          type="number"
          placeholder="Wpisz przgotowawczo-zakończeniowy"
          class="project-title mb-10"
          >Czas przgotowawczo-zakończeniowy (tpz):</input-component
        >
        <input-component
          v-model="newOperation.tj"
          type="number"
          placeholder="Wpisz czas jednostkowy"
          class="project-title mb-10"
          >Czas jednostkowy (tj):</input-component
        >

        <input-component
          v-model="newOperation.Nt"
          type="number"
          placeholder="Wpisz norme czasu"
          class="project-title mb-10"
          >Norma czasu (Nt):</input-component
        >
        <div class="separator"></div>

        <!-- Adding procedure -->
        <div
          v-if="newOperation.procedures.length > 0"
          v-for="procedure in newOperation.procedures"
          :key="procedure.id"
          style="display: flex; flex-direction: column"
        >
          <p class="procedure-title">Zabieg {{ procedure.number }}</p>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 0 50px;
            "
          >
            <div style="width: 100%">
              <input-component
                v-model="procedure.name"
                placeholder="Wpisz treść zabiegu/zadania montażowego"
                class="project-title"
                >Nazwa zabiegu/zadania:</input-component
              >
            </div>
            <button-with-icon
              is-tooltip
              tooltip-text="Usuń zabieg/zadanie montażowe"
              @click="deleteProcedure(procedure.id)"
              class="hide-menu"
              style="padding-right: 0"
            >
              <img
                src="../assets/trash-ico.svg"
                style="width: 24px; height: 24px"
                alt="edit"
              />
            </button-with-icon>
          </div>
          <div v-if="procedure.actions.length > 0" style="margin-top: 20px">
            <p>Czynności montażowe:</p>
            <div
              v-for="action in procedure.actions"
              :key="action.id"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <p>
                <span>{{ action.action }}.</span> {{ action.actionContent }}
              </p>
              <button-with-icon
                is-tooltip
                tooltip-text="Usuń czynność"
                @click="deleteAction(procedure.id, action.id)"
                class="hide-menu"
                style="padding-right: 0"
              >
                <img
                  src="../assets/trash-ico.svg"
                  style="width: 18px; height: 18px"
                  alt="edit"
                />
              </button-with-icon>
            </div>
          </div>
          <button-component
            flat
            @click="isAddAction = true"
            style="padding-right: 0; align-self: flex-end"
          >
            <img
              src="../assets/flat-plus-ico.svg"
              style="width: 20px; height: 20px"
              alt="ad"
            />
            Dodaj czynność montażową
          </button-component>
          <q-dialog
            no-esc-dismiss
            no-backdrop-dismiss
            :model-value="isAddAction"
            class="add-procedure"
          >
            <q-card>
              <q-card-section>
                <div>
                  <div class="mb-10">
                    <p style="margin-bottom: 5px !important">Typ czynności:</p>
                    <q-radio
                      dense
                      v-model="newAction.actionType"
                      val="auxiliary"
                      label="Pomocnicza"
                      style="margin-right: 10px"
                    />
                    <q-radio
                      dense
                      v-model="newAction.actionType"
                      val="main"
                      label="Główna"
                      style="margin-right: 10px"
                    />
                    <q-radio
                      dense
                      v-model="newAction.actionType"
                      val="control"
                      label="Kontrolno-pomiarowa"
                    />
                  </div>
                  <input-component
                    v-model="newAction.actionContent"
                    placeholder="Wpisz treść czynności"
                    class="project-title mb-10"
                    >Nazwa czynności:</input-component
                  >
                  <input-component
                    v-model="newAction.assemblyTool"
                    placeholder="Wpisz narzędzie montażowe/pomiarowo-kontrolne"
                    class="project-title mb-10"
                    >Narzędzie montażowe/pomiarowo-kontrolne:</input-component
                  >
                  <input-component
                    v-model="newAction.parameters"
                    placeholder="Wpisz parametry realizacji połączenia montażowego"
                    class="project-title mb-10"
                    >Parametry realizacji połączenia
                    montażowego:</input-component
                  >
                  <input-component
                    v-model="newAction.tg"
                    type="number"
                    placeholder="Wpisz czas główny"
                    class="project-title mb-10"
                    >Czas główny (tg):</input-component
                  >
                  <input-component
                    v-model="newAction.tp"
                    type="number"
                    placeholder="Wpisz czas pomocnicz"
                    class="project-title mb-10"
                    >Czas pomocniczy (tp):</input-component
                  >
                </div>
              </q-card-section>
              <q-card-actions align="center">
                <button-component flat v-close-popup @click="cancelAddAction"
                  >Anuluj</button-component
                >
                <button-component outline @click="addAction(procedure.id)"
                  >Dodaj</button-component
                >
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          "
        >
          <button-component
            flat
            @click="cancelAddNewOperation"
            style="padding-left: 0"
          >
            Anuluj
          </button-component>
          <div>
            <button-component
              flat
              @click="addProcedure"
              style="align-self: flex-end"
            >
              <img
                src="../assets/flat-plus-ico.svg"
                style="width: 20px; height: 20px"
                alt="ad"
              />
              Dodaj zabieg montażowy
            </button-component>
            <button-component @click="addNewOperation">
              Dodaj
            </button-component>
          </div>
        </div>
      </div>
    </div>
    <div v-if="operations.length > 0">
      <h3 style="font-size: 24px; line-height: 26px; margin: 30px 0 10px 0">
        Podgląd karty technologicznej:
      </h3>
      <div class="preview-technolgical-card">
        <div class="header">
          <div class="place label">Politechnika Krakowska</div>
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
          <div class="operation-number">Nr operacji</div>
          <div class="operation-content">Treść operacji</div>
          <div class="position">Stanowisko</div>
          <div class="position-symbol">Symbol stanowiska</div>
          <div class="time-norms">
            <div>Normy czasu</div>
            <div class="specific-times">
              <div>tpz</div>
              <div>tj</div>
              <div>Nt</div>
            </div>
          </div>
        </div>
        <div
          v-if="operations.length > 0"
          v-for="operation in operations"
          class="rows-wrap"
        >
          <div class="operation-number">
            {{ operation.operationNumber }}
          </div>
          <div class="operation-content">
            {{ operation.operationContent }}
          </div>
          <div class="position">
            {{ operation.position }}
          </div>
          <div class="position-symbol">
            {{ operation.positionSymbol }}
          </div>
          <div class="time-norms">
            <div>{{ operation.tpz }}</div>
            <div>{{ operation.tj }}</div>
            <div>{{ operation.Nt }}</div>
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
import createInstance from "../services/apiBase";

const $q = useQuasar();
const route = useRoute();

const project = ref(null);
const projectId = ref(null);
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
});

//Interactions with operations
const operations = ref([]);

const isAddNewOperation = ref(false);
let generalProcedureNumber = 1;
const newOperation = ref({
  id: operations.value.length + 1,
  operationNumber:
    operations.value.length > 0
      ? operations.value[operations.value.length - 1].operationNumber + 10
      : 10,
  operationContent: "",
  position: "",
  positionSymbol: "",
  tpz: 0,
  tj: 0,
  Nt: 0,
  procedures: [
    {
      id: 1,
      generalNumber: generalProcedureNumber,
      number: 1,
      name: "",
      actions: [],
    },
  ],
});

const clearAllFields = () => {
  newOperation.value.id = operations.value.length + 1;
  newOperation.value.operationNumber =
    operations.value.length > 0
      ? operations.value[operations.value.length - 1].operationNumber + 10
      : 10;
  newOperation.value.operationContent = "";
  newOperation.value.position = "";
  newOperation.value.positionSymbol = "";
  newOperation.value.tpz = 0;
  newOperation.value.tj = 0;
  newOperation.value.Nt = 0;
  newOperation.value.procedures = [
    {
      id: 1,
      generalNumber: generalProcedureNumber,
      number: 1,
      name: "",
      actions: [],
    },
  ];
};

const cancelAddNewOperation = () => {
  isAddNewOperation.value = false;
  clearAllFields();
};

const addNewOperation = () => {
  if (
    newOperation.value.operationContent !== "" &&
    newOperation.value.position !== "" &&
    newOperation.value.positionSymbol !== ""
  ) {
    operations.value.push({
      id: newOperation.value.id,
      operationNumber: newOperation.value.operationNumber,
      operationContent: newOperation.value.operationContent,
      position: newOperation.value.position,
      positionSymbol: newOperation.value.positionSymbol,
      tpz: newOperation.value.tpz,
      tj: newOperation.value.tj,
      Nt: newOperation.value.Nt,
      procedures: newOperation.value.procedures,
    });
    isAddNewOperation.value = false;
    clearAllFields();
    console.log(operations.value);
  } else {
    $q.notify({
      position: "top-right",
      message: "Uzupełnij wszystkie obowiązkowe pola!",
      color: "red",
    });
  }
};

const deleteOperation = (id) => {
  const index = operations.value
    .map((operation) => {
      return operation.id;
    })
    .indexOf(id);
  operations.value.splice(index, 1);
  clearAllFields();
};

//interactions with procedures
const addProcedure = () => {
  ++generalProcedureNumber;
  newOperation.value.procedures.push({
    id: newOperation.value.procedures.length + 1,
    generalProcedureNumber: generalProcedureNumber,
    number: newOperation.value.procedures.length + 1,
    name: "",
    actions: [],
  });
  console.log(operations.value);
};

const deleteProcedure = (id) => {
  const index = newOperation.value.procedures
    .map((procedure) => {
      return procedure.id;
    })
    .indexOf(id);

  console.log(
    index,
    newOperation.value.procedures.length - 1,
    newOperation.value.procedures
  );

  let newTable;
  if (index !== newOperation.value.procedures.length - 1) {
    const newProcedures = newOperation.value.procedures.filter(
      (procedure) => procedure.id > id
    );
    newTable = newProcedures.map((procedure) => {
      return {
        id: procedure.id - 1,
        generalProcedureNumber: procedure.generalProcedureNumber - 1,
        number: procedure.number - 1,
        name: procedure.name,
        actions: procedure.actions,
      };
    });
  }
  newOperation.value.procedures.splice(index, 1);
  if (index !== newOperation.value.procedures.length - 1) {
    newOperation.value.procedures = newTable;
  }
};

//Interactions with actions
const isAddAction = ref(false);
let generalActionNumber = 1;
const newAction = ref({
  generalOperationNumber: generalActionNumber,
  actionType: "auxiliary",
  actionContent: "",
  assemblyTool: "",
  parameters: "",
  tg: 0,
  tp: 0,
});

const clearNewAction = () => {
  newAction.value.actionType = "auxiliary";
  newAction.value.actionContent = "";
  newAction.value.assemblyTool = "";
  newAction.value.parameters = "";
  newAction.value.tg = "";
  newAction.value.tp = "";
};

const cancelAddAction = () => {
  isAddAction.value = false;
  clearNewAction();
};

const addAction = (id) => {
  ++generalActionNumber;
  newOperation.value.procedures[id - 1].actions.push({
    id: newOperation.value.procedures[id - 1].actions.length + 1,
    action: newOperation.value.procedures[id - 1].actions.length + 1,
    actionType: newAction.value.actionType,
    actionContent: newAction.value.actionContent,
    assemblyTool: newAction.value.assemblyTool,
    parameters: newAction.value.parameters,
    tg: newAction.value.tg,
    tp: newAction.value.tp,
  });

  isAddAction.value = false;
  clearNewAction();
};

const deleteAction = (procedureId, actionId) => {
  const index = newOperation.value.procedures[procedureId - 1].actions
    .map((action) => {
      return action.id;
    })
    .indexOf(actionId);

  newOperation.value.actions.splice(index, 1);
};

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
];

const actionsColumns = [
  {
    name: "setting",
    label: "Ustawienie",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.setting ?? "brak",
  },
  {
    name: "position",
    label: "Pozycja",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.position ?? "brak",
  },
  {
    name: "procedure",
    label: "Zabieg",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.procedure ?? "brak",
  },
  {
    name: "action",
    label: "Czynność",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.action ?? "brak",
  },
  {
    name: "actionType",
    label: "Typ czynności",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.actionType ?? "brak",
  },
  {
    name: "actionContent",
    label: "Treść czynności",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.actionContent ?? "brak",
  },
  {
    name: "assemblyTool",
    label: "Narzędzie montażowe/pomiarowo-kontrolne",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.assemblyTool ?? "brak",
  },
  {
    name: "parameters",
    label: "Parametry realizacji połączenia montażowego",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.parameters ?? "brak",
  },
  {
    name: "tg [s]",
    label: "tg",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.tg ?? "brak",
  },
  {
    name: "tp [s]",
    label: "tp",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.tp ?? "brak",
  },
  {
    name: "actions",
    label: "",
    align: "right",
    style: "width: 130px",
    sortable: false,
  },
];
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

    .separator {
      width: 100%;
      height: 1px;
      margin: 10px 0 20px 0;
      background-color: $dark-grey;
    }

    .procedure-title {
      font-size: 18px;
      margin-bottom: 10px !important;
    }
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

  .header {
    min-height: 100px;
    border-bottom: 2px solid #000;
    display: flex;

    & > div {
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

    & > div {
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

      & > div {
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

    & > div {
      font-weight: 400;
    }

    .time-norms {
      display: flex;
      flex-direction: row;
      align-items: center;

      & > div {
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
