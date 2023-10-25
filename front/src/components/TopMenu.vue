<template>
  <nav class="top-menu">
    <button-with-icon
      is-tooltip
      tooltip-text="Schowaj boczne menu"
      @click="$emit('clickHideMenu')"
      class="hide-menu">
      <i class="bx bx-menu"></i>
    </button-with-icon>
    <div style="display: flex; align-items: center;">
      <div class="welcome">
        <p>Dzień dobry {{ userStore.user.name }}</p>
        <img src="../assets/handshake.svg">
      </div>
      <div class="initials">
        <q-btn class="circle-button" :label="initials">
          <q-menu anchor="bottom start">
            <div class="user-info">
              <i class='bx bx-user-circle' style="font-size: 2.5rem;"></i>
              <div class="text-subtitle1">{{ userStore.user.name }} {{ userStore.user.surname }}</div>
              <button-component outline v-close-popup @click="logout">Wyloguj</button-component>
            </div>
          </q-menu>
        </q-btn>
      </div>
      <logo-component />
    </div>
  </nav>
</template>

<script setup>
import LogoComponent from "./LogoComponent.vue";
import ButtonWithIcon from "./ButtonWithIcon.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useUserStore } from "../store/user";
import router from "../router";

const userStore = useUserStore()

const logout = () => {
  userStore.logout();
  router.push("/auth");
};

const initials = getInitials();
function getInitials() {
  const username = `${userStore.user.name} ${userStore.user.surname}`;
  return username.match(/\b(\w)/g).join('').toUpperCase()
}

defineEmits(["clickHideMenu"]);
</script>

<style lang="scss">
.top-menu {
  padding: 0 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: $light;

  @media (min-width: 768px) {
    justify-content: space-between;
  }

  .hide-menu {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }

  .welcome {
    display: flex;
    align-items: center;
    gap: 0 5px;
    margin-right: 20px;

    p {
      margin-bottom: 0;
    }
  }
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
}

.circle-button {
  &.q-btn {
    height: auto;
    padding: 5px 10px;
    border-radius: 50%;
    background: transparent;
    color: $primary;
    text-transform: inherit;

    border: 2px solid $primary;
    color: $primary;

    &::before {
      border: none;
    }

    .q-focus-helper {
      background: transparent !important;
      opacity: 0 !important;
    }

    .q-ripple {
      display: none;
    }
  }
}
</style>
