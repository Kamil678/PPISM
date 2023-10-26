<template>
  <div :class="closeMenu ? 'sidebar close' : 'sidebar'">
    <!-- <a href="#" class="logo">
      <i class="bx bx-code-alt"></i>
      <div class="logo-name">
        <span>PPISM</span>
      </div>
    </a> -->
    <logo-component />
    <ul class="side-menu">
      <li class="active">
        <router-link to="/home" class="router-link"
          ><i class="bx bx-home"></i>Storna główna</router-link
        >
      </li>
      <li>
        <router-link to="/projects" class="router-link"
          ><i class="bx bx-book-open"></i>Projekty</router-link
        >
      </li>
      <li>
        <router-link to="/all-components" class="router-link"
          ><i class="bx bxs-component"></i>Komponenty</router-link
        >
      </li>
    </ul>
    <ul class="side-menu" style="margin-top: 50px">
      <li>
        <a href="#" class="logout" @click="logout">
          <i class="bx bx-log-out-circle"></i>
          Wyloguj się
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import LogoComponent from "./LogoComponent.vue";
import { useUserStore } from "../store/user";
import router from "../router";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push("/auth");
};

defineProps({
  closeMenu: Boolean,
});
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  background: $dark;
  width: 250px;
  height: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  overflow-x: hidden;

  .logo {
    margin-bottom: 50px;
  }

  &.close {
    width: 60px;

    .logo {
      padding-left: 0;

      .bx {
        min-width: 60px;
        display: flex;
        justify-content: center;
        font-size: 2.2rem;
      }
    }

    .router-link .bx,
    a .bx {
      color: $light;
      min-width: 60px;
      display: flex;
      font-size: 1.6rem;
      justify-content: center;
    }

    .side-menu {
      li {
        padding: 0;
      }
    }
  }

  .side-menu {
    width: 100%;

    li {
      background: transparent;
      padding: 4px;
      gap: 0 5px;
      margin-bottom: 10px;
      cursor: pointer;

      .router-link-active {
        color: $primary !important;
      }

      .router-link,
      .logout {
        display: flex;
        align-items: center;
        gap: 0 5px;
        width: 100%;
        height: 100%;
        font-size: 16px;
        color: $dark;
        overflow-x: hidden;
        transition: all 0.3s ease;
      }

      .router-link {
        color: $light;
      }

      .logout {
        color: $danger;
      }
    }
  }
}
</style>
