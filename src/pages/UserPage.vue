<template>
  <div class="page">
    <div class="user-wrap">
      <div class="welcome-text">
        <h1>Moje konto</h1>
        <p>
          Witaj w systemie do planowania procesów i systemów montażu. Stwórz
          swój własny projekt i poznaj możliwości naszego sytemu, powodzenia!
        </p>
        <p></p>
      </div>
      <div class="user-informations">
        <h3>Zmień podstawowe dane:</h3>
        <input-component
          v-model="user.name"
          type="text"
          placeholder="Wpisz imię"
          >Imię:</input-component
        >
        <input-component
          v-model="user.surname"
          type="text"
          placeholder="Wpisz nazwisko"
          >Nazwisko:</input-component
        >
        <select-component
          v-model="user.role"
          :options-list="optionsRole"
          is-filter
          >Rola:</select-component
        >
        <input-component
          v-model="user.email"
          placeholder="Podaj email"
          type="email"
          >Email:</input-component
        >
        <div class="user-actions-btns">
          <button-component
            outline
            class="delete-user"
            @click="deleteAccountModal = true"
            >Usuń konto</button-component
          >
          <confirm-modal
            v-model="deleteAccountModal"
            btn-text="Usuń konto"
            modal-text="Czy na pewno chcesz usunąć konto i wszystkie powiązane z nim projekty?"
            @click-cancel="deleteAccountModal = false"
            @click-confirm="deleteAccount"
          />
          <button-component outline @click="editUserData"
            >Edytuj dane</button-component
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import createInstance from "../services/apiBase";
import InputComponent from "../components/InputComponent.vue";
import SelectComponent from "../components/SelectComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import { useUserStore } from "../store/user";

const $q = useQuasar();

const userStore = useUserStore();
const optionsRole = [
  { value: 1, label: "Student" },
  { value: 2, label: "Pracownik uczelni" },
  { value: 3, label: "Pracownik z branży" },
  { value: 4, label: "Inny użytkownik" },
];

const user = ref({
  name: "",
  surname: "",
  role: { value: null, label: "" },
  email: "",
});

onMounted(async () => {
  await getUser();
});

const getUser = async () => {
  try {
    const instance = createInstance();
    const result = await instance.get(`/user/${userStore.user._id}`);
    user.value.name = result.data.user.name;
    user.value.surname = result.data.user.surname;
    user.value.role.value = result.data.user.role.id;
    user.value.role.label = result.data.user.role.name;
    user.value.email = result.data.user.email;
  } catch (err) {
    console.log(err);
  }
};

const editUserData = async () => {
  try {
    const instance = createInstance();
    const updatedUser = {
      name: user.value.name,
      surname: user.value.surname,
      role: { id: user.value.role.value, name: user.value.role.label },
      email: user.value.email,
    };
    const result = await instance.put(
      `/user/${userStore.user._id}`,
      updatedUser
    );
    localStorage.setItem("user", JSON.stringify(result.data.user));
    await getUser();
    document.location.reload();
    $q.notify({
      position: "top-right",
      message: "Pomyślnie zmieniono dane użytkownika",
      color: "green",
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteAccount = async () => {
  try {
    const instance = createInstance();
    await instance.delete(`/user/${userStore.user._id}`);
    //userStore.logout();
  } catch (err) {
    console.log(err);
  }
};

const deleteAccountModal = ref(false);
</script>

<style lang="scss" scoped>
.page {
  background-color: transparent;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .user-wrap {
    width: 900px;
    height: 500px;
    display: flex;
    justify-content: space-between;
    background-color: $light;
    border-radius: 10px;

    .welcome-text {
      height: 500px;
      background-color: $primary;
      border-radius: 10px 150px 100px 10px;
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: start;
      padding: 50px 20px 20px 30px;
      color: $light;
      max-width: 50%;

      h1 {
        font-size: 42px;
        line-height: 48px;
        font-weight: 500;
        margin-bottom: 50px;
        text-align: center;
      }

      p {
        text-align: center;
        font-size: 22px;
        margin-bottom: 0;
      }
    }

    .user-informations {
      padding: 50px 30px 20px 0;
      display: flex;
      flex-direction: column;
      gap: 10px 0;

      h3 {
        font-size: 26px;
      }

      .user-actions-btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;

        .delete-user {
          color: $danger;
          border-color: $danger;
        }
      }
    }
  }
}
</style>
