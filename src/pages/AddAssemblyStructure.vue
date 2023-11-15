<template>
  <div class="page page-add-assembly-structure">
    <div style="width: 50%;">
      <div class="add-teams-wrap">
        <div style="display: flex; flex-direction: column;">
          <h3 class="title">Zespoły: <tooltip-component tooltip-text="Podaj wszystkie zespoły, które będą wchodzić w skład struktury montażowej, wraz ze wszystkim częściami należącymi do nich" /></h3>
          <div v-for="team in teams" :key="team.id" class="mb-20">
            <input-component
              v-model="team.name"
              placeholder="Wpisz tytuł projektu"
              class="project-title mb-10">Nazwa zespołu:</input-component>
            <multiple-select-component
              v-model="team.parts"
              :options-list="allParts"
              is-filter>Wybierz części wchodzące w skład zespołu</multiple-select-component>
          </div>
          <button-component
            flat
            @click="addTeams"
            style="padding-right: 0; align-self: flex-end;">
            <img
              src="../assets/flat-plus-ico.svg"
              style="width: 20px; height: 20px"
              alt="ad" />
            Dodaj zespół
          </button-component>
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
          is-filter>Wybierz części wchodzące w skład zespołu</multiple-select-component>
      </div>
    </div>
    <div v-if="JM1.teams.length > 0 || JM1.parts.length > 0" class="diagram">
      <div class="finished-product">
        <div class="box">
          <div class="text">
            <p v-if="project">{{ project.productName }}</p>
          </div>
        </div>
        <div class="line-vertical"></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 30px;">
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
    </div>
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
const newTeams = ref({ id: teams.value.length + 1, name: '', parts: [] })
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
    return { label: part.name, value: part.id, numberSameParts: part.numberSameParts, numberFromAssemblyDrawing: part.numberFromAssemblyDrawing }
  })

  teams.value.push(newTeams.value)
})

const addTeams = () => {
  teams.value.push({ id: teams.value.length + 1, name: '', parts: [] })
}

const allTeamsOptions = ref([])
const clickSelectJM1Temas = () => {
  teams.value.forEach(team => {
    if (team.name !== '') {
      allTeamsOptions.value.push({ label: team.name, value: team.id })
    }
  })
}
</script>

<style lang="scss">
.page-add-assembly-structure {
  display: flex;
  gap: 0 50px;

  .add-teams-wrap,
  .add-JM1 {
    .title {
      font-size: 26px;
      margin-bottom: 10px;
    }
  }

  .add-JM1 {
    margin-top: 50px;
  }

  .diagram {
    width: 50%;
    display: flex;
    align-items: center;

    .finished-product {
      display: flex;
      flex-direction: column;
      align-items: center;

      .line-vertical {
        height: 100px;
        width: 1px;
        background-color: #000;
      }
    }

    .part {
      display: flex;
      flex-direction: row;
      align-items: center;

      .line-horizontal {
        width: 300px;
        height: 1px;
        background-color: #000;
        transform: translateX(-50px);
      }
    }

    .box {
      display: flex;
      width: 100px;
      height: 50px;
      border: 1px solid black;

      .numbers {
        width: 30px;
        height: 50px;
        text-align: center;

        div {
          width: 30px;
          height: 25px;
          border-right: 1px solid black;
        }

        div:nth-child(1) {
          border-bottom: 1px solid black;
        }
      }

      .text {
        text-align: center;
      }
    }
  }
}
</style>
