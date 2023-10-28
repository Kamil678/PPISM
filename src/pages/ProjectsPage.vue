<template>
  <div class="page projects-page" style="background-color: #fff">
    <div class="header-wrap">
      <h1>Lista projektów</h1>
      <button-component
        outline
        @click="router.replace('/add-project')"
        class="add-project-btn">Stwórz projekt</button-component>
    </div>
    <basic-table
      :hide-bottom="projects.length > 0"
      :rows="projects"
      :columns="columns"
      class="projects-table">
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm q-py-lg">
          Brak danych
        </div>
      </template>
      <!-- <template v-slot:header-cell-recipientsGroup="props">
        <q-th :props="props">
          Grupa<br />Odbiorców
          <q-u-tooltip
            tooltip-text="Informacja, do kogo kierowana jest ankieta (lekarze/przedstawiciele)"
          />
        </q-th>
      </template>
      <template v-slot:header-cell-targetGroup="props">
        <q-th :props="props">
          Grupa<br />docelowa
          <q-u-tooltip
            tooltip-text="Linia przedstawicieli, do której kierowana jest ankieta"
          />
        </q-th>
      </template>
      <template v-slot:header-cell-answersCount="props">
        <q-th :props="props"> Liczba<br />wypełnień </q-th>
      </template> -->
      <!-- <template v-slot:body-cell-title="props">
    </template> -->

      <template v-slot:body-cell-status="props">
        <q-td>
          <q-btn-dropdown
            unelevated
            :style="`color:#fff; background:${colorTextStatusMap[props.row.status.name]};`"
            :label="props.row.status.name === 'NEW' ? 'Nowy' : props.row.status.name === 'INPROGRES' ? 'W trakcie realizacji' : 'Ukończony'"
            class="status-btn">
            <q-list>
              <q-item
                dense
                v-for="slug in statusMap"
                :key="`${slug}-${props.row.id}`"
                clickable
                v-close-popup
                @click="e => showModal(slug, props.row)">
                <q-item-section>
                  <q-item-label>{{ getNameBySlug(slug) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-dialog
            :model-value="confirmStatusModal"
            persistent>
            <q-card style="padding: 30px;">
              <q-card-section style="border-bottom: 1px solid #ccc; padding: 0 0 20px 0;">
                <div class="text-h6 text-center">
                  Czy na pewno chcesz zmienić status?
                </div>
              </q-card-section>
              <q-card-actions style="padding: 20px 0 0 0 ; display: flex; justify-content: space-between;align-items: center;">
                <button-component
                  @click="confirmStatusModal = false"
                  flat>Anuluj</button-component>
                <button-component
                  outline
                  @click="changeStatus(props.row._id)">Zmień status</button-component>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
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
            <confirm-modal v-model="isDelete" btn-text="Usuń" modal-text="Czy na pewno chcesz usunąć ten projekt?" @click-cancel="isDelete = false"
              @click-confirm="confirmDeleteProject(props.row._id)" />
          </div>
        </q-td>
      </template>
    </basic-table>
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

const $q = useQuasar()
const projects = ref([]);

onMounted(async () => {
  await getProjects()
});

const getProjects = async () => {
  try {
    const instance = createInstance();
    const response = await instance.get("/projects");
    projects.value = response.data.projects;
  } catch (err) {
    console.log(err);
  }
}

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

const confirmStatusModal = ref(false)
const userSelectedData = ref({ name: '', id: null });

function showModal(slug, { id }) {
  confirmStatusModal.value = true;
  userSelectedData.value.name = slug.name;
  userSelectedData.value.id = slug.id;
}

async function changeStatus(id) {
  try {
    const instance = createInstance()
    await instance.put(`/project/status/${id}`, { id: userSelectedData.value.id, name: userSelectedData.value.name });
    confirmStatusModal.value = false;
    await getProjects()
    $q.notify({
      position: "top-right",
      message: 'Pomyślnie zmieniono status',
      color: 'green'
    })
  } catch (e) {
    $q.notify({
      position: "top-right",
      message: 'Nie udało się zmienić statusu',
      color: 'red'
    })
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
    name: 'NEW'
  },
  {
    id: 2,
    name: 'INPROGRES'
  },
  {
    id: 3,
    name: 'FINISHED'
  },
]

function getNameBySlug(slug) {
  if (slug.name === 'NEW') {
    return 'Nowy'
  }
  if (slug.name === 'INPROGRES') {
    return 'W trakcie realizacji'
  }
  if (slug.name === 'FINISHED') {
    return 'Ukończony'
  }
}

const onclickEditProject = (id) => {
  console.log('Click edit project', id)
}

const isDelete = ref(false)

const confirmDeleteProject = async (id) => {
  try {
    const instance = createInstance()
    instance.delete('project/' + id)
    isDelete.value = false
    await getProjects()
  } catch (err) {
    console.log(err)
  }
}
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
</style>