<template>
  <div class="page projects-page" style="background-color: #fff">
    <div class="btn-wrap">
      <button-component
        outline
        @click="router.replace('/add-project')"
        class="add-project-btn"
        >Stwórz projekt</button-component
      >
    </div>
    <basic-table
      :hide-bottom="projects.length > 0"
      :rows="projects"
      :columns="columns"
      class="projects-table"
    >
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

      <!-- <template v-slot:body-cell-status="props">
      <q-td>
        <q-btn-dropdown
          size="xs"
          unelevated
          :style="`color:${colorTextStatusMap[props.row.status.id]}; background:${colorStatusMap[props.row.status.id]};`"
          :label="props.row.status.name"
          class="status-btn">
          <q-list>
            <q-item
              dense
              v-for="slug in buttonList(props.row)"
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
        <q-btn class="tooltip-warning" v-if="compareDates(props.row.questionnaire_date_start_formatted, props.row.status)">
          !
          <q-tooltip anchor="top middle" self="bottom middle">Sugerowane rozpoczęcie ankiety</q-tooltip>
        </q-btn>
      </q-td>
    </template> -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="flex justify-end no-wrap" style="grid-gap: 10px">
            <button-with-icon
              is-tooltip
              tooltip-text="Edytuj projekt"
              @click="$emit('clickHideMenu')"
              class="hide-menu"
            >
              <img
                src="../assets/ic_edit.svg"
                style="width: 18px; height: 18px"
                alt="edit"
              />
            </button-with-icon>
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

const projects = ref([]);

onMounted(async () => {
  try {
    const instance = createInstance();
    const response = await instance.get("/projects");
    projects.value = response.data.projects;
  } catch (err) {
    console.log(err);
  }
});

const columns = [
  {
    name: "title",
    label: "Tytuł projektu",
    align: "left",
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
    field: (row) => row._createdAt ?? "brak",
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
</script>
<style lang="scss">
.projects-page {
  .btn-wrap {
    display: flex;
    justify-content: end;
    .add-project-btn {
      margin-bottom: 30px;
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

  // .status-btn {
  //   padding: 0 5px;
  //   min-height: auto;

  //   &:hover .q-focus-helper {
  //     opacity: 0 !important;
  //   }

  //   .q-ripple {
  //     display: none;
  //   }

  //   .q-btn__content {
  //     text-transform: initial;
  //     font-size: 13px;
  //   }

  //   .q-icon {
  //     width: 10px;
  //     margin-left: 5px;
  //   }
  // }
}

// .q-table__bottom {
//   margin-top: 15px;
//   border-top: none;
// }
</style>
