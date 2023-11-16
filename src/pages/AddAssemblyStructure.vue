<template>
  <div class="page page-add-assembly-structure">
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
          <div v-if="teams.length > 0" v-for="team in teams" :key="team.id" class="mb-20">
            <div>
              <p>Nazwa zespołu:</p>
              <p>{{ team.name }}</p>
            </div>
            <div>
              <p>Części wchodzące w skład zespołu:</p>
              <p v-for="part in team.parts" :key="part.id">{{ part.name }}</p>
            </div>
          </div>
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
                  <multiple-select-component
                    v-model="newTeam.parts"
                    :options-list="allParts"
                    is-filter
                    class="mb-10">Wybierz części wchodzące w skład zespołu</multiple-select-component>
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
          v-model="JM1.teams"
          :options-list="allTeamsOptions"
          is-filter
          no-option-text="Brak zespołów"
          @focus="clickSelectJM1Temas"
          class="mb-10">Wybierz zespoły wchodzące w skład JM1</multiple-select-component>
        <multiple-select-component
          v-model="JM1.parts"
          :options-list="allParts"
          is-filter>Wybierz części wchodzące w skład JM1</multiple-select-component>
      </div>
    </div>
    <div v-if="JM1.teams.length > 0 || JM1.parts.length > 0" class="diagram">
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
        <p style="margin-bottom: 30px !important; text-align: center;">JM1</p>
        <div style="display: flex; flex-direction: column; gap: 10px;margin-bottom: 20px;">
          <div v-for="team in JM1.teams" class="part">
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
          <div v-for="part in JM1.parts" class="part">
            <div class="line-horizontal"></div>
            <div :class="part.kind === 'combined' ? 'box green' : 'box blue'" style="transform: translateX(-50px);">
              <div class="numbers">
                <div>{{ part.numberSameParts }}</div>
                <div>{{ part.numberFromAssemblyDrawing }}</div>
              </div>
              <div class="text">{{ part.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button-component outline @click="saveAssemblyStructure">Zapisz strukturę montażową</button-component>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
// import router from "../router";
import createInstance from "../services/apiBase";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import SelectComponent from "../components/SelectComponent.vue";
import MultipleSelectComponent from "../components/MultipleSelectComponent.vue";
import TooltipComponent from "../components/TooltipComponent.vue";

const $q = useQuasar();

const project = ref(null)
const teams = ref([]);
const JM1 = ref({
  teams: [],
  parts: []
})

const newTeam = ref({ id: teams.value.length + 1, name: '', parts: [], otherTeams: [] })
const allParts = ref([])


const projectId = ref(null);
onMounted(async () => {
  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    projectId.value = searchParams.split("=")[1];
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
  newTeam.value.parts = [];
  newTeam.value.otherTeams = [];
}

const confirmAddTeam = () => {
  teams.value.push({
    id: teams.value.length + 1,
    name: newTeam.value.name,
    parts: newTeam.value.parts.map(part => {
      return { id: part.value, name: part.label, kind: part.kind, numberSameParts: part.numberSameParts, numberFromAssemblyDrawing: part.numberFromAssemblyDrawing }
    }),
    otherTeams: newTeam.value.otherTeams
  });
  clearAllFields()
  addTeam.value = false
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

  .add-JM1 {
    margin-top: 50px;
  }

  .diagram {
    width: 50%;
    display: flex;
    align-items: stretch;
    //height: 100%;

    .container {
      border-right: 2px dashed purple;
      height: 100%;
    }

    .finished-product {
      justify-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: center;
      //height: 100%;
      padding: 0 5px;
      border-left: 2px dashed purple;
      border-right: 2px dashed purple;

      .line-vertical {
        overflow: hidden;
        height: 100%;
        width: 1px;
        background-color: #000;
      }
    }

    .part {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 5px;
      //height: 100%;

      .line-horizontal {
        width: 300px;
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
        //height: 50px;
        text-align: center;

        div {
          width: 30px;
          //height: 25px;
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
