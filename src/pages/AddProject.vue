<template>
  <div class="page" style="background-color: transparent !important">
    <div class="wrap-add-project">
      <h1 v-if="!editProjectId">Nowy projekt</h1>
      <h1 v-if="editProjectId">Edytuj projekt</h1>
      <input-component
        v-model="newProject.title"
        placeholder="Wpisz tytuł projektu"
        class="project-title mb-20">Tytuł projektu:</input-component>
      <input-component
        v-model="newProject.description"
        placeholder="Wpisz tytuł projektu"
        class="mb-20">Opis projektu:</input-component>
      <input-component
        v-model="newProject.productName"
        placeholder="Wpisz tytuł projektu"
        class="mb-20">Podaj nazwę wyrobu gotowego:</input-component>
      <div class="mb-20" style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <p>Części:</p>
          <p v-if="newProject.parts.length === 0">Brak</p>
          <div v-else class="parts-container">
            <div v-for="part in newProject.parts" class="part-tag">
              {{ part.name }}
              <button-with-icon
                is-tooltip
                tooltip-text="Usuń część"
                @click="isDeletePart = true">
                <p class="fw-500 q-mb-none">&times;</p>
              </button-with-icon>
              <confirm-modal
                v-model="isDeletePart"
                btn-text="Usuń część"
                modal-text="Czy na pewno chcesz usunąć część?"
                @click-cancel="isDeletePart = false"
                @click-confirm="confirmDeletePart(part.id)" />
            </div>
          </div>
        </div>
        <button-component
          flat
          @click="addPartModal = true"
          style="padding-left: 0">
          <img
            src="../assets/plus-ico.svg"
            style="width: 20px; height: 20px"
            alt="ad" />
          Dodaj część
        </button-component>
      </div>
      <q-dialog
        no-esc-dismiss
        no-backdrop-dismiss
        :model-value="addPartModal"
        class="add-part-modal">
        <q-card>
          <q-card-section>
            <div>
              <input-component
                v-model="newPart.name"
                placeholder="Wpisz nazwę części"
                class="project-title mb-20">Nazwa części:</input-component>
              <input-component
                v-model="newPart.numberSameParts"
                type="number"
                placeholder="Wpisz liczbę takich samych części"
                class="mb-20">Liczba takich samych części:</input-component>
              <input-component
                v-model="newPart.numberFromAssemblyDrawing"
                type="number"
                placeholder="Wpisz numer z rysunku złożeniowego"
                class="mb-20">Numer z rysunku złożeniowego:</input-component>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <button-component flat v-close-popup @click="addPartModal = false">Anuluj</button-component>
            <button-component outline @click="addPart">Dodaj</button-component>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- <div class="mb-20" style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <p>Struktura montażowa:</p>
          <p v-if="newProject.parts.length === 0">Brak</p>
        </div>
        <button-component
          flat
          @click="addAssemblyStructure"
          style="padding-left: 0">
          <img
            src="../assets/plus-ico.svg"
            style="width: 20px; height: 20px"
            alt="ad" />
          Dodaj strukturę montażową
        </button-component>
      </div> -->
      <div class="actions-buttons">
        <button-component flat @click="router.replace('/projects')">Anuluj</button-component>
        <button-component v-if="!editProjectId" outline @click="saveProject">Zapisz projekt</button-component>
        <button-component v-if="editProjectId" outline @click="editProject">Edytuj projekt</button-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import router from "../router";
import createInstance from "../services/apiBase";

const $q = useQuasar();

const newProject = ref({
  title: "",
  description: "",
  productName: "",
  parts: [],
});

const addPartModal = ref(false);
const isDeletePart = ref(false);

const editProjectId = ref(null);
onMounted(async () => {
  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    editProjectId.value = searchParams.split("=")[1];
  }

  if (editProjectId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/project/" + editProjectId.value);
      newProject.value.title = result.data.project.title;
      newProject.value.description = result.data.project.description;
      newProject.value.productName = result.data.project.productName;
      newProject.value.parts = result.data.project.parts;
    } catch (err) {
      console.log(err);
    }
  }
});

const newPart = ref({
  name: "",
  numberSameParts: 0,
  numberFromAssemblyDrawing: 0,
});

const clearFieldAddPart = () => {
  newPart.value.name = "";
  newPart.value.numberSameParts = 0;
  newPart.value.numberFromAssemblyDrawing = 0;
};

const addPart = () => {
  if (validatePart()) {
    newProject.value.parts.push({
      id: newProject.value.parts.length + 1,
      name: newPart.value.name,
      numberSameParts: newPart.value.numberSameParts,
      numberFromAssemblyDrawing: newPart.value.numberFromAssemblyDrawing,
    });
    addPartModal.value = false;
    clearFieldAddPart();
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Nazwa części jest obowiązkowa",
      color: "red",
    });
  }
};

// const addAssemblyStructure = () => {
//   if (validateForm()) {
//     try {
//       const instance = createInstance();
//       const response = instance.post("project", newProject.value);
//       console.log(response)
//       //router.replace('/add-assembly-structure',)
//     } catch (err) {
//       console.log(err);
//     }
//   } else {
//     $q.notify({
//       position: "top-right",
//       message:
//         "Obowiązkowe pola powinny nie być puste i mieć więcej niż 5 znaków",
//       color: "red",
//     });
//   }
// }

const confirmDeletePart = (id) => {
  const index = newProject.value.parts
    .map((part) => {
      return part.id;
    })
    .indexOf(id);

  newProject.value.parts.splice(index, 1);
  isDeletePart.value = false;
};

const saveProject = async () => {
  if (validateForm()) {
    try {
      const instance = createInstance();
      instance.post("project", newProject.value);
      router.replace("/projects");
    } catch (err) {
      console.log(err);
    }
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Obowiązkowe pola powinny nie być puste i mieć więcej niż 5 znaków",
      color: "red",
    });
  }
};

const editProject = async () => {
  if (validateForm()) {
    try {
      const instance = createInstance();
      instance.put(`project/${editProjectId.value}`, newProject.value);
      router.replace("/projects");
    } catch (err) {
      console.log(err);
    }
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Obowiązkowe pola powinny nie być puste i mieć więcej niż 5 znaków",
      color: "red",
    });
  }
};

const validateForm = () => {
  if (
    newProject.value.title.length <= 5 ||
    newProject.value.description.length < 5
  ) {
    return false;
  } else {
    return true;
  }
};
const validatePart = () => {
  if (newPart.name === '') {
    return false
  } else {
    return true
  }
};
</script>

<style lang="scss">
.wrap-add-project {
  margin: 0 auto;
  height: auto;
  width: auto;
  background-color: $light;
  border-radius: 10px;
  padding: 30px;

  @media (min-width:$breakpoint-large) {
    width: 700px;
  }

  h1 {
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 20px;
    text-align: center;

    @media (min-width:$breakpoint-small) {
      font-size: 40px;
      line-height: 48px;
    }
  }

  .project-title {
    margin-bottom: 20px;
  }

  .actions-buttons {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px 0;
    align-items: center;
    justify-content: space-between;

    @media (min-width:$breakpoint-small) {
      flex-direction: row;
    }

    .q-btn--flat {
      padding-left: 0;
    }
  }

  .parts-container {
    display: flex;
    align-items: center;
    gap: 10px;

    .part-tag {
      //min-width: 50px;
      width: auto;
      background-color: $dark-grey;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5px;

      .q-btn {
        padding-left: 5px;
      }
    }
  }
}

.add-part-modal {
  .q-card {
    min-width: 500px;
    padding: 10px;

    .q-card__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
