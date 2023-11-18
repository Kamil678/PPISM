<template>
  <div class="page page-preview-assembly-structure">
    <div class="diagram">
      <div class="finished-product">
        <p>JM0</p>
        <div class="box">
          <div class="text">
            <p>Wyrób główny</p>
          </div>
        </div>
        <div class="line-vertical"></div>
      </div>
      <div class="container">
        <p style="margin-bottom: 30px !important; text-align: center;">JM1</p>
        <div style="display: flex; flex-direction: column; gap: 10px;margin-bottom: 20px;">
          <div v-for="team in assemblyStructure.JM1[0].teams" class="part">
            <div class="line-horizontal"></div>
            <div class="box">
              <div class="numbers">
                <div>Z</div>
                <div>1</div>
              </div>
              <div class="text">{{ team.label }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div v-for="part in assemblyStructure.JM1[0].parts" class="part">
            <div class="line-horizontal"></div>
            <div :class="part.kind === 'combined' ? 'box green' : 'box blue'">
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
  <div v-for="team in assemblyStructure.teams" class="page page-preview-assembly-structure">
    <div class="diagram">
      <div class="finished-product">
        <p>JM1</p>
        <div class="box">
          <div class="text">
            <p>{{ team.name }}</p>
          </div>
        </div>
        <div class="line-vertical"></div>
      </div>
      <div class="container">
        <p style="margin-bottom: 30px !important; text-align: center;">JM2</p>
        <div style="display: flex; flex-direction: column; gap: 10px;margin-bottom: 20px;">
          <div v-for="otherTeam in team.otherTeams" class="part">
            <div class="line-horizontal"></div>
            <div class="box">
              <div class="numbers">
                <div>Z</div>
                <div>1</div>
              </div>
              <div class="text">{{ otherTeam.label }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div v-for="part in team.parts" class="part">
            <div class="line-horizontal"></div>
            <div :class="part.kind === 'combined' ? 'box green' : 'box blue'">
              <div class=" numbers">
                <div :style="part.kind === 'combined' ? 'border-color:#388e3c' : 'border-color:#1976d2'">{{ part.numberSameParts }}</div>
                <div :style="part.kind === 'combined' ? 'border-color:#388e3c' : 'border-color:#1976d2'">{{ part.numberFromAssemblyDrawing }}</div>
              </div>
              <div class="text">{{ part.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
// // import router from "../router";
import createInstance from "../services/apiBase";
// import InputComponent from "../components/InputComponent.vue";
// import ButtonComponent from "../components/ButtonComponent.vue";
// import ButtonWithIcon from "../components/ButtonWithIcon.vue";
// import ConfirmModal from "../components/ConfirmModal.vue";
// import SelectComponent from "../components/SelectComponent.vue";
// import MultipleSelectComponent from "../components/MultipleSelectComponent.vue";
// import TooltipComponent from "../components/TooltipComponent.vue";

// const $q = useQuasar();

const assemblyStructureId = ref(null);
const assemblyStructure = ref({
  JM1: [
    {
      teams: [],
      parts: []
    }
  ],
  teams: []
})
onMounted(async () => {
  const searchParams = window.location.search;
  assemblyStructureId.value = searchParams.split("=")[1];

  if (assemblyStructureId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/assembly-structure/" + assemblyStructureId.value);
      assemblyStructure.value = result.data.assemblyStructure
    } catch (err) {
      console.log(err);
    }
  }
});
</script>

<style lang="scss">
.page-preview-assembly-structure {

  .diagram {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    //height: 100%;

    .container {
      border-right: 2px dashed purple;
      height: 100%;
      width: 50%;
    }

    .finished-product {
      width: 300px;
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
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 5px;
      transform: translateX(-155px);

      .line-horizontal {
        width: 65%;
        height: 1px;
        background-color: #000;
        overflow: hidden;
      }

      .box {
        z-index: 2;
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
