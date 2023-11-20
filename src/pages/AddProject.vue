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
import router from "../router";
import createInstance from "../services/apiBase";

const $q = useQuasar();

const newProject = ref({
  title: "",
  description: "",
});

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
    } catch (err) {
      console.log(err);
    }
  }
});

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
    flex-wrap: wrap;
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
