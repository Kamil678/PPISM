<template>
  <div class="page">
    <h1 class="latest-project-label">Ostatnie projekty</h1>
    <div v-if="latestProjects.length > 0" class="latest-projects">
      <div
        v-for="project in latestProjects"
        :key="project._id"
        class="single-project">
        <div>
          <p class="label">Tytuł:</p>
          <p>{{ project.title }}</p>
        </div>
        <div>
          <p class="label">Opis:</p>
          <p>{{ project.description }}</p>
        </div>
        <div>
          <p class="label">Data utworzenia:</p>
          <p>{{ new Date(project.createdAt).toLocaleDateString() }}</p>
        </div>
        <button-component
          outline
          @click="router.replace('/projects')"
          class="show-more-btn">Zobacz szczegóły</button-component>
      </div>
    </div>
    <div v-else class="no-projects">
      Brak projektów
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "../router";
import createInstance from "../services/apiBase";
import ButtonComponent from "../components/ButtonComponent.vue";

const latestProjects = ref([]);
onMounted(async () => {
  await getLatestProjects();
});

const getLatestProjects = async () => {
  try {
    const instance = createInstance();
    const response = await instance.get("/projects");
    latestProjects.value = response.data.projects.slice(0, 3);
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss">
.latest-project-label {
  font-size: 36px;
  line-height: 42px;
}

.latest-projects {
  margin-top: 30px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px 20px;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0 20px;
  }

  .single-project {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 10px 0;
    text-align: left;
    border: 2px solid #000;
    border-radius: 10px;
    padding: 10px;

    div {
      display: flex;
      align-items: center;
      gap: 0 5px;

      p {
        margin-bottom: 0;

        &.label {
          font-weight: 500;
        }
      }
    }

    .show-more-btn {
      margin-top: 20px;
      align-self: center;
    }
  }
}

.no-projects {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>
