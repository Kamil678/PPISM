<template>
  <div class="page">
    <div style="width: 50%; background-color: aqua;"></div>
    <div class="graph" style="width: 50%;">
      <div class="box">
        <div class="numbers">
          <div>1</div>
          <div>1</div>
        </div>
        <div>{{ inputValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
// import { ref, onMounted } from "vue";
// import router from "../router";
// import createInstance from "../services/apiBase";

const $q = useQuasar();
</script>

<style lang="scss">
.graph {
  .box {
    display: flex;
    width: 100px;
    height: 50px;
    border: 1px solid black;

    .numbers {
      width: 30px;
      height: 50px;

      div {
        width: 30px;
        height: 25px;
        border-right: 1px solid black;
      }

      div:nth-child(1) {
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>
