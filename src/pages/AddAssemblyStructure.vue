<template>
  <div class="page page-add-assembly-structure">
    <div style="width: 50%;">
      <div>
        <p>Zespoły:</p>
        <div v-for="team in teams" :key="team.id">
          <input-component
            v-model="team.name"
            placeholder="Wpisz tytuł projektu"
            class="project-title mb-20">Nazwa zespołu:</input-component>
        </div>
      </div>
    </div>
    <div class="diagram">
      <div class="finished-product">
        <div class="box">
          <div class="text">
            <p v-if="project">{{ project.productName }}</p>
          </div>
        </div>
        <div class="line-vertical"></div>
      </div>
      <div class="part">
        <div class="line-horizontal"></div>
        <div class="box" style="transform: translateX(-50px);">
          <div class="numbers">
            <div>1</div>
            <div>1</div>
          </div>
          <div class="text">Czesć 1</div>
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

const $q = useQuasar();

const project = ref(null)
const teams = ref([
  {
    id: teams.value.length + 1,
    name: '',
    parts: []
  }
])

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
})
</script>

<style lang="scss">
.page-add-assembly-structure {
  display: flex;
  gap: 0 50px;

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
