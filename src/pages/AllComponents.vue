<template>
  <div class="page">
    <div>
      <h5 style="margin-bottom: 10px">Buttony:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <button-component>Podstawowy button</button-component>
        <button-component outline>Button flat</button-component>
        <button-component flat>Button flat</button-component>
      </div>
    </div>
    <div style="margin-top: 20px">
      <h5 style="margin-bottom: 10px">Button z ikoną:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <button-with-icon is-tooltip tooltip-text="Opis co robi">
          <i class="bx bx-menu"></i>
        </button-with-icon>
      </div>
    </div>
    <div style="margin-top: 20px">
      <h5 style="margin-bottom: 10px">Input:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <input-component v-model="inputValue" placeholder="Placeholder">Label</input-component>
      </div>
    </div>
    <div style="margin-top: 20px">
      <h5 style="margin-bottom: 10px">Textarea:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <input-component
          type="textarea"
          v-model="textareaValue"
          placeholder="Placeholder">Label</input-component>
      </div>
    </div>
    <div style="margin-top: 20px">
      <h5 style="margin-bottom: 10px">Select:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <select-component
          v-model="selectValue"
          :options-list="optionsToSelect"
          is-filter>Label</select-component>
      </div>
    </div>
    <div style="margin-top: 20px">
      <h5 style="margin-bottom: 10px">Multiple select:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <multiple-select-component
          v-model="multipleSelectValue"
          :options-list="optionsToSelect"
          is-filter>Label</multiple-select-component>
      </div>
    </div>
    <div style="margin-top: 20px">
      <h5 style="margin-bottom: 10px">Tooltip:</h5>
      <div style="display: flex; align-items: center; gap: 0 5px">
        <tooltip-component tooltip-text="Tooltip tekst" />
      </div>
    </div>
    <div class="box">
      <div class="numbers">
        <div>1</div>
        <div>1</div>
      </div>
      <div>{{ inputValue }}</div>
    </div>
  </div>
</template>

<script setup>
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
//mermaid.initialize({ startOnLoad: true });
import { ref } from "vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import InputComponent from "../components/InputComponent.vue";
import SelectComponent from "../components/SelectComponent.vue";
import MultipleSelectComponent from "../components/MultipleSelectComponent.vue";
import TooltipComponent from "../components/TooltipComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";

const inputValue = ref("f");
const textareaValue = ref("");
const selectValue = ref("");
const optionsToSelect = ["Option 1", "Option 2", "Option 3"];
const multipleSelectValue = ref([]);
</script>

<style lang="scss">
// .box {
//   display: flex;
//   width: 100px;
//   height: 50px;
//   border: 1px solid black;

//   .numbers {
//     width: 30px;
//     height: 50px;

//     div {
//       width: 30px;
//       height: 25px;
//       border-right: 1px solid black;
//     }

//     div:nth-child(1) {
//       border-bottom: 1px solid black;
//     }
//   }
// }
</style>
