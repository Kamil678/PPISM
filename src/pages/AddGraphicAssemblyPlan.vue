<template>
  <div class="page page-add-graphic-assembly-plan">
    <div class="all-team-wrap">
      <div style="display: flex; align-items: center; justify-content: end;">
        <button-component flat @click=" router.replace('/projects')" style="padding-left: 0; margin-right: 20px;">Anuluj</button-component>
        <button-component v-if="graphicAssemblyPlanId === null" outline @click="saveGraphicAssemblyPlan">Zapisz graficzny plan montażu</button-component>
        <button-component v-else outline @click="editGraphicAssemblyPlan">Edytuj graficzny plan montażu</button-component>
      </div>
      <div v-for="team in graphicAssemblyPlan.teams" class="team">
        <div class="info">
          <h3>{{ team.name }}</h3>
          <p>Ustaw kolejność montowania poszczególnych części i zespołów</p>
          <div style="display: flex; flex-direction: column; gap: 10px 0; margin-top: 10px;">
            <multiple-select-component
              v-model="team.order"
              :options-list="team.allElements"
              is-filter>Ustaw kolejność</multiple-select-component>
          </div>
          <div v-if="team.order" style="display: flex; flex-direction: column; gap: 5px 0; margin-top: 10px;">
            <div v-for="(element, index) in team.order" class="order">
              <p class="order-number">{{ index + 1 }}.</p>
              <p class="selected-element">{{ element.label }}</p>
            </div>
          </div>
        </div>
        <div class="diagram">
          <div class="finished-product">
            <div class="box">
              <div class="text">
                <p>{{ team.name }}</p>
              </div>
            </div>
          </div>
          <div class="all-parts-wrap">
            <div class="parts" style="display: flex; flex-direction: column-reverse; gap: 10px; margin: 10px 0;">
              <div v-for="part in team.order" class="part">
                <div v-if="part.kind" style=" display: flex; align-items: center;">
                  <div :class="part.kind === 'combined' ? 'box green' : 'box blue'">
                    <div class=" numbers">
                      <div :style="part.kind === 'combined' ? 'border-color:#388e3c' : 'border-color:#1976d2'">{{ part.numberSameParts }}</div>
                      <div :style="part.kind === 'combined' ? 'border-color:#388e3c' : 'border-color:#1976d2'">{{ part.numberFromAssemblyDrawing }}</div>
                    </div>
                    <div class="text">{{ part.label ? part.label : part.name }}</div>
                  </div>
                  <div class="line-horizontal"></div>
                </div>
                <div v-if="!part.kind" style="transform: translateX(100%); display: flex; align-items: center;">
                  <div class="line-horizontal"></div>
                  <div class="box">
                    <div class="text">{{ part.label ? part.label : part.name }}</div>
                    <div class="numbers-right">
                      <div style="word-break: break-all;">{{ getFirstLetters(part.label) }}</div>
                      <div>1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="line-vertical"></div>
            <div class="other-teams" style="display: flex; flex-direction: column; gap: 10px;margin-bottom: 20px;">

            </div>
          </div>
          <div class="base-part">
            <div class="box red">
              <div class="numbers">
                <div>{{ team.basePart.numberSameParts }}</div>
                <div>{{ team.basePart.numberFromAssemblyDrawing }}</div>
              </div>
              <div class="text">{{ team.basePart.name }}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import router from "../router";
import createInstance from "../services/apiBase";
import MultipleSelectComponent from "../components/MultipleSelectComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import { useRoute } from "vue-router";

const $q = useQuasar();
const route = useRoute();
const project = ref([]);
const assemblyStructure = ref({
  JM1: [
    {
      teams: [],
      parts: []
    }
  ],
  teams: []
})

const assemblyStructureId = ref(null);
const graphicAssemblyPlan = ref({
  teams: [],
  projectId: route.params.projectId,
  assemblyStructureId: null
});
const graphicAssemblyPlanId = ref(null)
onMounted(async () => {
  const projectId = route.params.projectId

  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    graphicAssemblyPlanId.value = searchParams.split("=")[1];
  }

  if (projectId) {
    try {
      const instance = createInstance();
      const result = await instance.get("/project/" + projectId);
      project.value = result.data.project
      assemblyStructureId.value = result.data.project.assemblyStructure
      graphicAssemblyPlan.value.assemblyStructureId = assemblyStructureId.value
    } catch (err) {
      console.log(err);
    }
  }

  if (assemblyStructureId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/assembly-structure/" + assemblyStructureId.value);
      assemblyStructure.value = result.data.assemblyStructure

      graphicAssemblyPlan.value.teams = assemblyStructure.value.teams
      graphicAssemblyPlan.value.teams.forEach(team => {
        team.order = []
      })
      graphicAssemblyPlan.value.teams.forEach(team => {
        const optionsParts = team.parts.map(part => {
          return { label: part.name, value: part.id, kind: part.kind, numberSameParts: part.numberSameParts, numberFromAssemblyDrawing: part.numberFromAssemblyDrawing }
        })
        const optionsOtherTeams = team.otherTeams.map(team => {
          return { label: team.name, value: team.id + 100, parts: team.parts, otherTeams: team.otherTeams }
        })
        team.allElements = [...optionsParts, ...optionsOtherTeams]
      })
    } catch (err) {
      console.log(err);
    }
  }

  if (graphicAssemblyPlanId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/graphic-assembly-plan/" + graphicAssemblyPlanId.value);
      graphicAssemblyPlan.value.teams = result.data.graphicAssemblyPlan.teams;
      graphicAssemblyPlan.value.projectId = result.data.graphicAssemblyPlan.projectId;
      graphicAssemblyPlan.value.assemblyStructureId = result.data.graphicAssemblyPlan.assemblyStructureId
    } catch (err) {
      console.log(err);
    }
  }
})


const saveGraphicAssemblyPlan = async () => {
  try {
    const instance = createInstance();
    instance.post("graphic-assembly-plan", graphicAssemblyPlan.value);
    router.replace("/projects");
  } catch (err) {
    console.log(err);
  }
}

const getFirstLetters = (string) => {
  return string.split(' ').map(function (item) { return item[0] }).join('')
}

const editGraphicAssemblyPlan = async () => {
  try {
    const instance = createInstance();
    instance.put(`graphic-assembly-plan/${graphicAssemblyPlanId.value}`, graphicAssemblyPlan.value);
    router.replace("/projects");
  } catch (err) {
    console.log(err);
  }
}


// const checkData = () => {
//   if (graphicAssemblyPlan.value.length === 0 || JM1.value.length === 0) {
//     return false
//   } else {
//     return true
//   }
// }
</script>

<style lang="scss">
.page-add-graphic-assembly-plan {
  .all-team-wrap {
    .team {
      margin-bottom: 30px;
      display: flex;
      gap: 0 30px;

      .info {
        width: 30%;

        .order {
          display: flex;
          align-items: center;
          gap: 0 5px;

          .order-number {
            font-weight: 500;
          }
        }
      }

      .diagram {
        position: relative;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .all-parts-wrap {
          width: 100%;
          display: flex;
          justify-content: center;

          .parts {
            width: 33.33%;

            .part {
              width: 100%;

              .line-horizontal {
                width: 100%;
                height: 1px;
                background-color: #000;
                overflow: hidden;
              }

              .box {
                z-index: 2;
              }
            }
          }

          .line-vertical {
            width: 33.33%;
            justify-self: center;
            overflow: hidden;
            min-height: 200px;
            height: 100%;
            width: 1px;
            background-color: #000;
          }

          .other-teams {
            width: 33.33%;
            display: flex;
            margin-bottom: 50px;
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

          &.red {
            border-color: $danger;

            .numbers {
              div {
                border-color: $danger !important;
              }
            }
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

          .numbers-right {
            width: 30px;
            text-align: center;

            div {
              width: 30px;
              height: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border-left: 1px solid black;
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

      h3 {
        font-size: 22px;
        line-height: 34px;
      }
    }
  }
}
</style>
