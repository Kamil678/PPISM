<template>
  Add assembly structure
</template>

<script setup>
import { useQuasar } from "quasar";
// import { ref, onMounted } from "vue";
// import router from "../router";
// import createInstance from "../services/apiBase";

const $q = useQuasar();
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
