<template>
  <q-table
    :columns="columns"
    :rows="rows"
    v-bind="$attrs"
    ref="table"
    separator="none"
    dense
    binary-state-sort
    flat
    no-data-label="Nic nie znaleziono dla Ciebie"
  >
    <template v-for="(_, name) in $slots" #[name]="scope" :key="name">
      <slot :name="name" v-bind="scope" />
    </template>

    <template #item="props">
      <q-card>
        <q-card-section>
          <dl v-for="col in props.cols" :key="col.label" class="row">
            <dt class="col">{{ col.label }}:</dt>
            <dd class="col text-left">
              {{ getCellValue(props.row, col) }}
            </dd>
          </dl>
        </q-card-section>
      </q-card>
      <!-- {{ props }} -->
    </template>

    <template #loading>
      <q-inner-loading showing color="primary"></q-inner-loading>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCellValue = (row: any, col: any) => {
  const val = typeof col.field === "function" ? col.field(row) : row[col.field];
  return col.format ? col.format(val, row) : val;
};
const table = ref();
defineProps({
  loading: {
    type: Boolean,
    default: () => false,
  },
  rows: {
    default: () => [],
    type: Array,
  },
  columns: {
    default: () => [],
    type: Array,
  },
});
defineExpose({ table });
// onMounted(() => {
//   //example hook
//   // console.log('test',toRaw(props.rows));
//   // let qtable = table.value;
//   // console.log(qtable.grid);
//   //  console.log(qtable.querySelector('.q-table').style.setProperty('--border-width','10px'));
//   // console.log(getCurrentInstance().ctx.$refs.table);
// });
</script>
