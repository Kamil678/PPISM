<template>
  <div class="page">
    <q-table
      :hide-bottom="productParts.length > 0"
      :columns="columns"
      :rows="productParts"
      row-key="title"
      v-bind="$attrs"
      ref="table"
      separator="none"
      dense
      binary-state-sort
      flat
      class="all-parts-table">
      <q-td key="allPartsPerShift" :props="props">
        {{ props.row.title }}
      </q-td>
      <template v-slot:body-cell-allPartsPerShift="props">
        <q-td :props="props">
          {{ props.row.numberSameParts * Pzm }}
        </q-td>
      </template>
      <template v-slot:body-cell-totalMassPerShift="props">
        <q-td :props="props">
          {{ props.row.numberSameParts * props.row.mass * Pzm }}
        </q-td>
      </template>
      <template v-slot:body-cell-totalVolumePerShift="props">
        <q-td :props="props">
          {{ props.row.numberSameParts * props.row.volume * Pzm }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import createInstance from "../services/apiBase";

// const projectId = ref(null);
const productId = ref(null);
const productParts = ref([])
const Pzm = ref(null)
onMounted(async () => {
  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    productId.value = searchParams.split("=")[1];
  }

  if (productId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/product/" + productId.value);
      productParts.value = result.data.product.parts
      Pzm.value = result.data.product.Pzm
    } catch (err) {
      console.log(err);
    }
  }
});

const columns = [
  {
    name: "name",
    label: "Nazwa części",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.name ?? "brak",
  },
  {
    name: "material",
    label: "Materiał części",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.material ?? "brak",
  },
  {
    name: "mass",
    label: "Materiał części",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.mass ?? "brak",
  },
  {
    name: "volume",
    label: "Objętość części",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.volume ?? "brak",
  },
  {
    name: "numberSameParts",
    label: "Liczba tych samych części",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.numberSameParts ?? "brak",
  },
  {
    name: "numberFromAssemblyDrawing",
    label: "Numer z rysunku złożeniowego",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
    field: (row) => row.numberFromAssemblyDrawing ?? "brak",
  },
  {
    name: "allPartsPerShift",
    label: "Liczba wszystkich części na zmianę",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
  },
  {
    name: "totalMassPerShift",
    label: "Całkowita masa części na zmianę",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
  },
  {
    name: "totalVolumePerShift",
    label: "Całkowita objętość części na zmianę",
    align: "left",
    classes: "q-table--col-auto-width",
    headerClasses: "q-table--col-auto-width",
  },
]
</script>
<style lang="scss">
.all-parts-table {
  &.q-table__card {
    background-color: transparent;
  }

  th {
    white-space: wrap !important;
  }
}
</style>
