<template>
  <q-dialog
    no-esc-dismiss
    no-backdrop-dismiss
    :model-value="modelValue"
    class="confirm-modal"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">
          {{ modalText }}
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <button-component flat v-close-popup @click="$emit('clickCancel')"
          >Anuluj</button-component
        >
        <button-component outline @click="$emit('clickConfirm')">{{
          btnText
        }}</button-component>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  modelValue: Boolean,
  btnText: String,
  modalText: String,
});

defineEmits(["clickConfirm", "clickCancel"]);
</script>
<style lang="scss">
.confirm-modal {
  .q-card {
    padding: 20px;
    .q-card__section,
    .q-card__actions {
      padding: 0;
    }

    .q-card__section {
      border-bottom: none;
    }

    .q-card__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
}
</style>
