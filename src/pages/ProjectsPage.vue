<template>
  <div class="page projects-page" style="background-color: #fff">
    <div class="header-wrap">
      <h1>Lista projektów</h1>
      <button-component
        outline
        @click="router.replace('/add-project')"
        class="add-project-btn">Stwórz projekt</button-component>
    </div>
    <q-table
      :hide-bottom="projects.length > 0"
      :columns="columns"
      :rows="projects"
      row-key="title"
      v-bind="$attrs"
      ref="table"
      separator="none"
      dense
      binary-state-sort
      flat
      class="projects-table">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
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
          <q-td auto-width>
            <button-with-icon
              is-tooltip
              tooltip-text="Pokaż szczegóły projektu"
              @click="props.expand = !props.expand"
              style="padding-left: 0">
              <img
                src="../assets/plus-ico.svg"
                style="width: 20px; height: 20px"
                alt="ad" />
            </button-with-icon>
          </q-td>
          <q-td key="title" :props="props">
            {{ props.row.title }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="status" :props="props">
            <q-btn-dropdown
              unelevated
              :style="`color:#fff; background:${colorTextStatusMap[props.row.status.name]
                };`"
              :label="props.row.status.name === 'NEW'
                ? 'Nowy'
                : props.row.status.name === 'INPROGRES'
                  ? 'W trakcie realizacji'
                  : 'Ukończony'
                "
              class="status-btn">
              <q-list>
                <q-item
                  dense
                  v-for="slug in statusMap"
                  :key="`${slug}-${props.row.id}`"
                  clickable
                  v-close-popup
                  @click="(e) => showModal(slug, props.row)">
                  <q-item-section>
                    <q-item-label>{{ getNameBySlug(slug) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <confirm-modal
              v-model="confirmStatusModal"
              btn-text="Zmień status"
              modal-text="Czy na pewno chcesz zmienić status?"
              @click-cancel="confirmStatusModal = false"
              @click-confirm="changeStatus(props.row._id)" />
          </q-td>
          <q-td key="created" :props="props">
            {{ new Date(props.row.createdAt).toLocaleDateString() ?? "brak" }}
          </q-td>
          <q-td key="actions" :props="props">
            <div class="flex justify-end no-wrap" style="grid-gap: 10px">
              <button-with-icon
                is-tooltip
                tooltip-text="Edytuj projekt"
                @click="router.replace('/add-project?id=' + props.row._id)"
                class="hide-menu">
                <img
                  src="../assets/ic_edit.svg"
                  style="width: 18px; height: 18px"
                  alt="edit" />
              </button-with-icon>
              <button-with-icon
                is-tooltip
                tooltip-text="Usuń projekt"
                @click="isDelete = true"
                class="hide-menu">
                <img
                  src="../assets/trash-ico.svg"
                  style="width: 18px; height: 18px"
                  alt="edit" />
              </button-with-icon>
              <confirm-modal
                v-model="isDelete"
                btn-text="Usuń"
                modal-text="Czy na pewno chcesz usunąć ten projekt?"
                @click-cancel="isDelete = false"
                @click-confirm="confirmDeleteProject(props.row._id)" />
            </div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" class="second-row">
            <div class="document-wrap" style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p>Wyrób:</p>
              </div>
              <button-component
                v-if="!props.row.product"
                flat
                @click="router.replace(`${props.row._id}/add-product`)"
                style="padding-right: 0">
                <img
                  src="../assets/plus-ico.svg"
                  style="width: 20px; height: 20px"
                  alt="ad" />
                Dodaj wyrób
              </button-component>
              <div v-else class="flex justify-end no-wrap" style="grid-gap: 10px">
                <button-with-icon
                  is-tooltip
                  tooltip-text="Edytuj wyrób"
                  @click="router.replace(`${props.row._id}/add-product?id=${props.row.product}`)"
                  class="hide-menu">
                  <img
                    src="../assets/ic_edit.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Usuń wyrób"
                  @click="showDeleteProductModal = true"
                  class="hide-menu"
                  style="padding-right: 0;">
                  <img
                    src="../assets/trash-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <confirm-modal
                  v-model="showDeleteProductModal"
                  btn-text="Usuń"
                  modal-text="Czy na pewno chcesz usunąć wyrób?"
                  @click-cancel="showDeleteProductModal = false"
                  @click-confirm="deleteProduct(props.row.product)" />
              </div>
            </div>
            <div class="document-wrap" style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p>Struktura montażowa:</p>
                <!-- <p v-if="newProject.parts.length === 0">Brak</p> -->
              </div>
              <button-component
                v-if="!props.row.assemblyStructure"
                flat
                @click="addAssemblyStructure(props.row._id)"
                style="padding-right: 0">
                <img
                  src="../assets/plus-ico.svg"
                  style="width: 20px; height: 20px"
                  alt="ad" />
                Dodaj strukturę montażową
              </button-component>
              <div v-else class="flex justify-end no-wrap" style="grid-gap: 10px">
                <button-with-icon
                  is-tooltip
                  tooltip-text="Podgląd struktury montażowej"
                  @click="router.replace(`/preview-assembly-structure?id=` + props.row.assemblyStructure)"
                  class="hide-menu">
                  <img
                    src="../assets/eye-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Edytuj strukturę montażową"
                  @click="onclickEditAssemblyStructure(props.row._id, props.row.assemblyStructure)"
                  class="hide-menu">
                  <img
                    src="../assets/ic_edit.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Usuń strukturę montażową"
                  @click="isDeleteAssemblyStructure = true"
                  class="hide-menu"
                  style="padding-right: 0;">
                  <img
                    src="../assets/trash-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <confirm-modal
                  v-model="isDeleteAssemblyStructure"
                  btn-text="Usuń"
                  modal-text="Czy na pewno chcesz usunąć ten strukturę montażową?"
                  @click-cancel="isDeleteAssemblyStructure = false"
                  @click-confirm="confirmDeleteAssemblyStructure(props.row.assemblyStructure)" />
              </div>
            </div>
            <div class="document-wrap" style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p>Graficzny plan montażu:</p>
                <!-- <p v-if="newProject.parts.length === 0">Brak</p> -->
              </div>
              <button-component
                v-if="!props.row.graphicAssemblyPlan"
                flat
                @click="addGraphicAssemblyPlan(props.row._id)"
                style="padding-right: 0">
                <img
                  src="../assets/plus-ico.svg"
                  style="width: 20px; height: 20px"
                  alt="ad" />
                Dodaj graficzny plan montażu
              </button-component>
              <div v-else class="flex justify-end no-wrap" style="grid-gap: 10px">
                <button-with-icon
                  is-tooltip
                  tooltip-text="Podgląd graficznego planu montażu"
                  @click="router.replace(`/preview-assembly-structure?id=` + props.row.assemblyStructure)"
                  class="hide-menu">
                  <img
                    src="../assets/eye-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Edytuj graficzny plan montażu"
                  @click="router.replace(`${props.row._id}/add-graphic-assembly-plan?id=${props.row.graphicAssemblyPlan}`)"
                  class="hide-menu">
                  <img
                    src="../assets/ic_edit.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <button-with-icon
                  is-tooltip
                  tooltip-text="Usuń graficzny plan montażu"
                  @click="isDeleteGraphicAssemblyPlan = true"
                  class="hide-menu"
                  style="padding-right: 0;">
                  <img
                    src="../assets/trash-ico.svg"
                    style="width: 18px; height: 18px"
                    alt="edit" />
                </button-with-icon>
                <confirm-modal
                  v-model="isDeleteGraphicAssemblyPlan"
                  btn-text="Usuń"
                  modal-text="Czy na pewno chcesz usunąć graficzny plan montażu?"
                  @click-cancel="isDeleteGraphicAssemblyPlan = false"
                  @click-confirm="confirmDeleteGraphicAssemblyPlan(props.row.graphicAssemblyPlan)" />
              </div>
            </div>
            <div class="document-wrap" style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p>Tabela z zadaniami montażowymi:</p>
              </div>
              <div>
                <q-file
                  v-model="assemblyTasksTable"
                  label="Wgraj tabelę z zadaniami montażowymi"
                  filled
                  class="file-picker"
                  style="max-width: 300px" />
              </div>
            </div>
            <div class="document-wrap" style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p>Karta technologiczna:</p>
              </div>
              <div>
                <q-file
                  v-model="technologicalCard"
                  label="Wgraj kartę technologiczna"
                  filled
                  class="file-picker"
                  style="max-width: 300px" />
              </div>
            </div>
            <div class="document-wrap" style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <p>Karty instrukcyjne:</p>
              </div>
              <div>
                <q-file
                  v-model="instructionCards"
                  label="Wgraj karty instrukcyjne"
                  filled
                  class="file-picker"
                  style="max-width: 300px" />
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import BasicTable from "../components/BasicTable.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";
import router from "../router";
import createInstance from "../services/apiBase";
import ConfirmModal from "../components/ConfirmModal.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const projects = ref([]);

const getProjects = async () => {
  try {
    const instance = createInstance();
    const response = await instance.get("/projects");
    projects.value = response.data.projects;
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await getProjects();
});


const columns = [
  {
    name: "title",
    label: "Tytuł projektu",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    headerStyle: "padding-left:0",
    style: "padding-left:0 !important",
    field: (row) => row.title ?? "brak",
    //sortable: true,
  },
  {
    name: "description",
    label: "Opis projektu",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.description ?? "brak",
    sortable: true,
  },
  {
    name: "status",
    label: "Status projektu",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.status.name ?? "brak",
    sortable: true,
  },
  {
    name: "created",
    label: "Data utworzenia",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => new Date(row.createdAt).toLocaleDateString() ?? "brak",
    sortable: true,
  },
  {
    name: "actions",
    label: "",
    align: "right",
    style: "width: 130px",
    sortable: false,
  },
];

//Change status
const confirmStatusModal = ref(false);
const userSelectedData = ref({ name: "", id: null });

function showModal(slug, { id }) {
  confirmStatusModal.value = true;
  userSelectedData.value.name = slug.name;
  userSelectedData.value.id = slug.id;
}

async function changeStatus(id) {
  try {
    const instance = createInstance();
    await instance.put(`/project/status/${id}`, {
      id: userSelectedData.value.id,
      name: userSelectedData.value.name,
    });
    confirmStatusModal.value = false;
    await getProjects();
    $q.notify({
      position: "top-right",
      message: "Pomyślnie zmieniono status",
      color: "green",
    });
  } catch (e) {
    $q.notify({
      position: "top-right",
      message: "Nie udało się zmienić statusu",
      color: "red",
    });
  }
}

const colorTextStatusMap = {
  NEW: "#fbc02d",
  INPROGRES: "#388e3c",
  FINISHED: "#5c5d6d",
};

const statusMap = [
  {
    id: 1,
    name: "NEW",
  },
  {
    id: 2,
    name: "INPROGRES",
  },
  {
    id: 3,
    name: "FINISHED",
  },
];

function getNameBySlug(slug) {
  if (slug.name === "NEW") {
    return "Nowy";
  }
  if (slug.name === "INPROGRES") {
    return "W trakcie realizacji";
  }
  if (slug.name === "FINISHED") {
    return "Ukończony";
  }
}

//Delete project
const isDelete = ref(false);
const confirmDeleteProject = async (id) => {
  try {
    const instance = createInstance();
    instance.delete("project/" + id);
    isDelete.value = false;
    await getProjects();
  } catch (err) {
    console.log(err);
  }
};

//Interaction with assembly structure
const addAssemblyStructure = (id) => {
  router.replace(`${id}/add-assembly-structure`)
}

const onclickEditAssemblyStructure = (projectId, assemblyStructureId) => {
  router.replace(`${projectId}/add-assembly-structure?id=${assemblyStructureId}`)
};

const isDeleteAssemblyStructure = ref(false)
const confirmDeleteAssemblyStructure = async (id) => {
  try {
    const instance = createInstance();
    instance.delete("assembly-structure/" + id);
    isDeleteAssemblyStructure.value = false;
    await getProjects();
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};

//Interaction with product
const showDeleteProductModal = ref(false);
const deleteProduct = async (id) => {
  try {
    const instance = createInstance();
    instance.delete("product/" + id);
    showDeleteProductModal.value = false;
    await getProjects();
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
}

//Interaction with graphic assembly plan
const addGraphicAssemblyPlan = (id) => {
  router.replace(`${id}/add-graphic-assembly-plan`)
}

const isDeleteGraphicAssemblyPlan = ref(false)
const confirmDeleteGraphicAssemblyPlan = async (id) => {
  try {
    const instance = createInstance();
    instance.delete("graphic-assembly-plan/" + id);
    isDeleteGraphicAssemblyPlan.value = false;
    await getProjects();
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};

//Interactions with assembly tasks table
const assemblyTasksTable = ref(null);

//Interactions with assembly tasks table
const technologicalCard = ref(null);

//Interactions with assembly tasks table
const instructionCards = ref(null);
</script>
<style lang="scss">
.projects-page {
  .header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h1 {
      font-size: 36px;
      line-height: 42px;
    }
  }
}

.projects-table {

  th,
  td {
    border-bottom: none;
  }

  th {
    font-size: 14px !important;
  }

  td {
    padding: 6px 8px !important;
  }

  .status-btn {
    padding: 0 5px;
    min-height: auto;

    &:hover .q-focus-helper {
      opacity: 0 !important;
    }

    .q-ripple {
      display: none;
    }

    .q-btn__content {
      text-transform: initial;
      font-size: 13px;
    }

    .q-icon {
      width: 10px;
      margin-left: 5px;
    }
  }
}

// .q-table__bottom {
//   margin-top: 15px;
//   border-top: none;
// }

.second-row {
  .document-wrap {
    padding: 5px 30px !important;
    min-height: 50px;

    .file-picker {
      width: 220px;
      background-color: #fff;
      border: 2px dashed #D1D1D1;

      .q-field__control {
        background: transparent;
        min-height: 35px;
        height: 35px;

        .q-field__control-container {
          padding-top: 20px;
        }

        .q-field__marginal {
          height: 35px;
        }

        .q-field__native {
          min-height: 18px;
          padding-bottom: 0;
        }

        .q-field__label {
          font-size: 12px;
          color: var(--q-primary);
          top: 12px;
        }

        &::before {
          background: transparent;
        }
      }

      &.q-field--float .q-field__label {
        transform: translateY(-50%) scale(0.75);
      }

      &.q-field--filled .q-field__control {
        &::after {
          height: 0;
        }

        &::before {
          border: none;
        }
      }
    }
  }
}
</style>
