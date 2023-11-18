<template>
  <div class="page">
    <div class="page-add-assembly-structure">
      <div style="width: 50%;">
        <div class="add-teams-wrap">
          <div style="display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 10px;">
              <h3 class="title">Zespoły montażowe: <tooltip-component
                  tooltip-text="Podaj wszystkie zespoły, w odpowiedniej kolejności, które będą wchodzić w skład struktury montażowej, wraz ze wszystkim częściami należącymi do nich" /></h3>
              <button-component
                flat
                @click="clickNewTeam"
                style="padding-right: 0; align-self: flex-end;">
                <img
                  src="../assets/flat-plus-ico.svg"
                  style="width: 20px; height: 20px"
                  alt="ad" />
                Dodaj zespół
              </button-component>
            </div>
            <q-table
              :hide-pagination="true"
              :rows-per-page-options="[0]"
              v-if="teams.length > 0"
              :columns="columns"
              :rows="teams"
              row-key="name"
              v-bind="$attrs"
              ref="table"
              separator="none"
              dense
              binary-state-sort
              flat
              class="teams-table">
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
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="parts" :props="props">
                    <div v-if="props.row.parts.length <= 3">
                      <p v-for="part in props.row.parts" :key="part.id" class="team-part">{{ part.name }}, </p>
                    </div>
                    <div v-else>
                      <p v-for="(part, index) in props.row.parts" :key="part.id" class="team-part">
                        <span v-if="index < 4">{{ part.name }}, </span>
                      </p>
                      <button-with-icon
                        is-tooltip
                        :tooltip-text="props.row.parts.forEach(part => { return part.name })"
                        @click="isDeleteAssemblyStructure = true"
                        class="hide-menu"
                        style="padding-right: 0;">
                        +{{ props.row.parts.length - 3 }}
                      </button-with-icon>
                    </div>
                  </q-td>
                  <q-td key="actions" :props="props">
                    <div class="flex justify-end no-wrap" style="grid-gap: 10px">
                      <button-with-icon
                        is-tooltip
                        tooltip-text="Usuń projekt"
                        @click="confirmDeleteTeam(props.row.id)"
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
            <!-- <q-table
              v-if="teams.length > 0"
              title="Treats"
              :rows="rows"
              :columns="columns"
              row-key="name" /> -->
            <div v-else>
              Brak zespołów
            </div>
            <q-dialog
              no-esc-dismiss
              no-backdrop-dismiss
              :model-value="addTeam"
              class="add-part-modal">
              <q-card>
                <q-card-section>
                  <div>
                    <input-component
                      v-model="newTeam.name"
                      placeholder="Wpisz tytuł projektu"
                      class="project-title mb-10">Nazwa zespołu:</input-component>
                    <select-component select-part v-model="newTeam.basePart" :options-list="allParts" class="mb-10" is-filter>Wybierz część bazową zespołu:</select-component>
                    <multiple-select-component
                      v-model="newTeam.parts"
                      :options-list="allParts"
                      select-part
                      is-filter
                      class="mb-10">
                      <div style="display: flex; align-items: center; gap: 0 5px;">
                        Wybierz pozostałe części wchodzące w skład zespołu
                        <tooltip-component
                          tooltip-text="Pamiętaj aby dodawać części w odpowiedniej kolejności montowania, a więc zaczynając od części bazowej aż do efektu finalnego jednostki montażowej" />
                      </div>
                    </multiple-select-component>
                    <multiple-select-component
                      v-model="newTeam.otherTeams"
                      :options-list="allTeamsOptions"
                      no-option-text="Brak innych zespołów"
                      is-filter>Wybierz inne zespoły wchodzące w skład tego zespołu</multiple-select-component>
                  </div>
                </q-card-section>
                <q-card-actions align="center">
                  <button-component flat v-close-popup @click="addTeam = false">Anuluj</button-component>
                  <button-component outline @click="confirmAddTeam">Dodaj</button-component>
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
        <div class="add-JM1">
          <h3 class="title">Jednostaka montażowa 1 rzędu</h3>
          <multiple-select-component
            v-model="JM1[0].teams"
            :options-list="allTeamsOptions"
            is-filter
            no-option-text="Brak zespołów"
            @focus="clickSelectJM1Temas"
            class="mb-10">Wybierz zespoły wchodzące w skład JM1</multiple-select-component>
          <multiple-select-component
            v-model="JM1[0].parts"
            :options-list="allParts"
            select-part
            is-filter>Wybierz części wchodzące w skład JM1</multiple-select-component>
        </div>
      </div>
      <div v-if="JM1[0].teams.length > 0 || JM1[0].parts.length > 0" class="diagram">
        <div class="finished-product">
          <p>JM0</p>
          <div class="box">
            <div class="text">
              <p v-if="project">{{ project.productName }}</p>
            </div>
          </div>
          <div class="line-vertical"></div>
        </div>

        <div class="container">
          <p style="margin-bottom: 50px !important; text-align: center;">JM1</p>
          <div style="display: flex; flex-direction: column; gap: 10px;margin-bottom: 20px;">
            <div v-for="team in JM1[0].teams" class="part">
              <div class="line-horizontal"></div>
              <div class="box" style="transform: translateX(-50px);">
                <div class="numbers">
                  <div>Z</div>
                  <div>1</div>
                </div>
                <div class="text">{{ team.label }}</div>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div v-for="part in JM1[0].parts" class="part">
              <div class="line-horizontal"></div>
              <div :class="part.kind === 'combined' ? 'box green' : 'box blue'" style="transform: translateX(-50px);">
                <div class="numbers">
                  <div :style="part.kind === 'combined' ? 'border-color:#388e3c' : 'border-color:#1976d2'">{{ part.numberSameParts }}</div>
                  <div :style="part.kind === 'combined' ? 'border-color:#388e3c' : 'border-color:#1976d2'">{{ part.numberFromAssemblyDrawing }}</div>
                </div>
                <div class="text">{{ part.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 30px;">
      <button-component flat @click="router.replace('/projects')" style="padding-left: 0;">Anuluj</button-component>
      <button-component outline @click="saveAssemblyStructure">Zapisz strukturę montażową</button-component>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import router from "../router";
import createInstance from "../services/apiBase";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";
import MultipleSelectComponent from "../components/MultipleSelectComponent.vue";
import SelectComponent from "../components/SelectComponent.vue";
import TooltipComponent from "../components/TooltipComponent.vue";
import { useRoute } from "vue-router";

const $q = useQuasar();
const route = useRoute();

const project = ref(null)
const teams = ref([]);
const JM1 = ref([{
  teams: [],
  parts: []
}])

const newTeam = ref({ id: teams.value.length + 1, name: '', parts: [], basePart: null, otherTeams: [] })
const allParts = ref([])


const projectId = ref(null);
const assemblyStructureId = ref(null);
onMounted(async () => {
  projectId.value = route.params.projectId
  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    assemblyStructureId.value = searchParams.split("=")[1];
  }

  if (projectId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/project/" + projectId.value);
      project.value = result.data.project
    } catch (err) {
      console.log(err);
    }
  }

  if (assemblyStructureId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/assembly-structure/" + assemblyStructureId.value);
      teams.value = result.data.assemblyStructure.teams;
      JM1.value = result.data.assemblyStructure.JM1;
    } catch (err) {
      console.log(err);
    }
  }

  allParts.value = project.value.parts.map(part => {
    return { label: part.name, value: part.id, kind: part.kind, numberSameParts: part.numberSameParts, numberFromAssemblyDrawing: part.numberFromAssemblyDrawing }
  })

  $q.notify({
    position: "top-right",
    message:
      "Pamiętaj aby zespoły podawać w odpowiedniej kolejności, ponieważ mogą być one zagnieżdżane!",
    color: "blue",
  });
})

const columns = [
  {
    name: "name",
    label: "Nazwa zespołu",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    headerStyle: "padding-left:0",
    style: "padding-left:0 !important",
    field: (row) => row.name ?? "brak",
    //sortable: true,
  },
  {
    name: "parts",
    label: "Części wchodzące w skład zespołu",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.parts ?? "brak",
    sortable: true,
  },
  {
    name: "actions",
    label: "",
    align: "right",
    sortable: false,
  },
];

const allTeamsOptions = ref([])
const clickSelectJM1Temas = () => {
  allTeamsOptions.value = teams.value.map(team => {
    return { label: team.name, value: team.id, parts: team.parts, otherTeams: team.otherTeams }
  })
}

const addTeam = ref(false);

const clickNewTeam = () => {
  allTeamsOptions.value = teams.value.map(team => {
    return { label: team.name, value: team.id, parts: team.parts, otherTeams: team.otherTeams }
  })
  addTeam.value = true
}

const clearAllFields = () => {
  newTeam.value.name = '';
  newTeam.value.basePart = null;
  newTeam.value.parts = [];
  newTeam.value.otherTeams = [];
}

const confirmAddTeam = () => {
  teams.value.push({
    id: teams.value.length + 1,
    name: newTeam.value.name,
    basePart: { id: newTeam.value.basePart.value, name: newTeam.value.basePart.label, kind: newTeam.value.basePart.kind, numberSameParts: newTeam.value.basePart.numberSameParts, numberFromAssemblyDrawing: newTeam.value.basePart.numberFromAssemblyDrawing },
    parts: newTeam.value.parts.map(part => {
      return { id: part.value, name: part.label, kind: part.kind, numberSameParts: part.numberSameParts, numberFromAssemblyDrawing: part.numberFromAssemblyDrawing }
    }),
    otherTeams: newTeam.value.otherTeams.map(team => {
      return { id: team.value, name: team.label, parts: team.parts, otherTeams: team.otherTeams }
    }),
  });
  clearAllFields()
  addTeam.value = false
}

const isDeleteTeam = ref(false)
const confirmDeleteTeam = (id) => {
  const removeIndex = teams.value.map(team => team.id).indexOf(id);
  teams.value.splice(removeIndex, 1)
}

const saveAssemblyStructure = () => {
  const newAssemblyStructure = {
    teams: teams.value,
    JM1: JM1.value,
    project: projectId.value
  }

  if (checkData()) {
    try {
      const instance = createInstance();
      instance.post("assembly-structure", newAssemblyStructure);
      router.replace("/projects");
    } catch (err) {
      console.log(err);
    }
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Nie można stworzyć struktury montażowej bez zespołów montażowych",
      color: "red",
    });
  }
}

const checkData = () => {
  if (teams.value.length === 0 || JM1.value.length === 0) {
    return false
  } else {
    return true
  }
}
</script>

<style lang="scss">
.page-add-assembly-structure {
  display: flex;
  height: 100%;
  gap: 0 50px;
  overflow: hidden;

  .add-teams-wrap,
  .add-JM1 {
    .title {
      font-size: 26px;
      line-height: 30px;
    }
  }

  .teams-table {
    background-color: transparent;

    .team-part {
      display: inline;
    }
  }

  .add-JM1 {
    margin-top: 50px;
  }

  .diagram {
    width: 100%;
    display: flex;
    align-items: stretch;
    //height: 100%;

    .container {
      width: 100%;
      border-right: 2px dashed purple;
      height: 100%;
    }

    .finished-product {
      width: 200px;
      justify-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 5px;
      border-left: 2px dashed purple;
      border-right: 2px dashed purple;

      .line-vertical {
        overflow: hidden;
        height: 100%;
        width: 1px;
        background-color: #000;
      }

      .box {
        text-align: center;

        .text {
          width: 100%;
          text-align: center;
        }
      }
    }

    .part {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 5px;
      transform: translateX(-35px);

      .line-horizontal {
        width: 50%;
        height: 1px;
        background-color: #000;
        transform: translateX(-50px);
      }
    }

    .box {
      display: flex;
      border: 1px solid black;

      &.green {
        border-color: $success;
      }

      &.blue {
        border-color: $primary;
      }

      .numbers {
        width: 30px;
        text-align: center;

        div {
          width: 30px;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid black;
        }

        div:nth-child(1) {
          border-bottom: 1px solid black;
        }
      }

      .text {
        padding: 10px;
        text-align: center;
      }
    }
  }
}
</style>
