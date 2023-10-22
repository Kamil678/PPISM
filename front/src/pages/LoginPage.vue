<template>
  <div class="form-container">
    <div :class="isSignIn ? 'sign-up-form active-sign-in' : 'sign-up-form'">
      <form>
        <h1>Stwórz konto</h1>
        <input-component type="text" placeholder="Wpisz imię"
          >Imię:</input-component
        >
        <input-component type="text" placeholder="Wpisz nazwisko"
          >Nazwisko:</input-component
        >
        <input-component placeholder="Podaj email" type="email"
          >Email:</input-component
        >
        <input-component type="password" placeholder="Podaj hasło"
          >Hasło:</input-component
        >
        <input-component type="password" placeholder="Powtórz hasło"
          >Powtórz hasło:</input-component
        >
        <button-component>Utwórz konto</button-component>
        <a href="#" @click="isSignIn = true">Masz już konto? Zaloguj sie</a>
      </form>
    </div>
    <div :class="isSignIn ? 'sign-in-form' : 'sign-in-form active-sign-in'">
      <form>
        <h1>Zaloguj się</h1>
        <input-component placeholder="Podaj email" type="email"
          >Email:</input-component
        >
        <input-component type="password" placeholder="Podaj hasło"
          >Hasło:</input-component
        >
        <button-component>Zaloguj się</button-component>
        <a href="#" @click="isSignIn = false"
          >Nie posiadasz jeszcze konta? Utwórz konto</a
        >
      </form>
    </div>
    <div class="toggle-container">
      <div class="toggle">
        <div
          class="toggle-panel toggle-sign-in"
          :style="!isSignIn ? 'transform:translate(0,-50%)' : ''"
        >
          <h2>Witaj ponownie!</h2>
          <p>Zaloguj się aby zobaczyć swoje projekty</p>
          <button-component outline @click="isSignIn = true"
            >Zaloguj się</button-component
          >
        </div>
        <div
          class="toggle-panel toggle-sign-up"
          :style="!isSignIn ? 'transform:translate(-200%,-50%)' : ''"
        >
          <h2>Witaj!</h2>
          <p>Zarejestruj się aby w pełni korzystać z sytemu</p>
          <button-component outline @click="isSignIn = false"
            >Zarajestruj się</button-component
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";

const isSignIn = ref(true);
</script>

<style lang="scss">
.form-container {
  width: 900px;
  max-width: 100%;
  min-height: 600px;
  position: relative;
  background: $light;
  border-radius: 10px;
  max-width: 100%;
  box-shadow: 0px 0px 2px -1px rgba(54, 57, 73, 1);

  .active-sign-in {
    display: none;
  }

  a {
    color: $primary;
    font-size: 13px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
  }

  .sign-up-form,
  .sign-in-form {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;

    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px 0;
      padding: 0 40px;
      height: 100%;

      h1 {
        font-size: 48px;
        line-height: 58px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
  }

  .sign-up-form {
    padding: 30px;
  }
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 10px 10px 100px;

  .toggle {
    background-color: $primary;
    height: 100%;
    color: $light;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .q-btn {
      color: $light;
      border-color: $light;
    }

    .toggle-panel {
      position: absolute;
      top: 50%;
      width: 100%;
      padding: 0 30px;
      text-align: center;
      transition: all 0.6s ease-in-out;

      h2 {
        font-size: 48px;
        font-weight: 500;
        margin-bottom: 20px;
      }

      p {
        margin-bottom: 20px;
      }
    }

    .toggle-sign-in {
      transform: translate(-200%, -50%);
    }

    .toggle-sign-up {
      right: 0;
      transform: translate(0, -50%);
    }

    // .toggle-sign-in-transform {
    //   transform: translate(200%, -50%) !important;
    // }

    // .toggle-sign-up-transform {
    //   transform: translate(0, -50%) !important;
    // }
  }
}
</style>
