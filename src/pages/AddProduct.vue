<template>
  <div class="page" style="background-color: transparent !important">
    <div class="wrap-add-product">
      <input-component
        v-model="newProduct.name"
        placeholder="Wpisz nazwę wyrobu gotowego"
        class="mb-10">Podaj nazwę wyrobu gotowego:</input-component>
      <input-component
        v-model="newProduct.numberFromAssemblyDraw"
        type="number"
        placeholder="Wpisz numer rysunku złożeniowego"
        class="mb-10">Podaj numer rysunku złożeniowego:</input-component>
      <input-component
        v-model="newProduct.seriesSize"
        type="number"
        placeholder="Wpisz wielkość serii"
        class="mb-20">Podaj wielkość serii:</input-component>
      <div class="separator"></div>
      <input-component
        v-model="newProduct.yearlyProductionProgram"
        type="number"
        placeholder="Wpisz roczny program produkcji"
        class="mb-10">Roczny program produkcji [szt/rok]:</input-component>
      <input-component
        v-model="newProduct.DpT"
        type="number"
        placeholder="Wpisz ilość dni roboczych w tygodniu"
        class="mb-10">Ilość dni roboczych w tygodniu (DpT) [dni/tyg]:</input-component>
      <input-component
        v-model="newProduct.IZ"
        type="number"
        placeholder="Wpisz ilość zmian na dzień roboczy"
        class="mb-10">Ilość zmian na dzień roboczy (IZ) [zm]:</input-component>
      <input-component
        v-model="newProduct.TnZ"
        type="number"
        placeholder="Wpisz ilość godzin na zmianę"
        class="mb-10">Ilość godzin na zmianę (TnZ) [h/zm]:</input-component>
      <input-component
        v-model="newProduct.TnP"
        type="number"
        placeholder="Wpisz planowane przerwy"
        class="mb-10">Planowane przerwy (TnP) [h/zm]:</input-component>
      <input-component
        v-model="newProduct.DpR"
        type="number"
        placeholder="Wpisz dni robocze w roku"
        class="mb-10">Dni roboczych w roku (DpR) [dni]:</input-component>
      <div class="mb-20" style="display: flex; align-items: center; justify-content: space-between;">
        <div style=" max-width: 80%;">
          <p>Części:</p>
          <p v-if="newProduct.parts.length === 0">Brak</p>
          <div v-else class="parts-container">
            <div v-for="part in newProduct.parts" class="part-tag">
              {{ part.name }}
              <button-with-icon
                is-tooltip
                tooltip-text="Usuń część"
                @click="isDeletePart = true">
                <p class="fw-500 q-mb-none">&times;</p>
              </button-with-icon>
              <confirm-modal
                v-model="isDeletePart"
                btn-text="Usuń część"
                modal-text="Czy na pewno chcesz usunąć część?"
                @click-cancel="isDeletePart = false"
                @click-confirm="confirmDeletePart(part.id)" />
            </div>
          </div>
        </div>
        <button-component
          flat
          @click="addPartModal = true"
          style="padding-left: 0">
          <img
            src="../assets/plus-ico.svg"
            style="width: 20px; height: 20px"
            alt="ad" />
          Dodaj część
        </button-component>
      </div>
      <q-dialog
        no-esc-dismiss
        no-backdrop-dismiss
        :model-value="addPartModal"
        class="add-part-modal">
        <q-card>
          <q-card-section>
            <div>
              <input-component
                v-model="newPart.name"
                placeholder="Wpisz nazwę części"
                class="project-title mb-20">Nazwa części:</input-component>
              <div class="mb-20">
                <p style="margin-bottom: 5px !important;">Rodzaj części</p>
                <q-radio dense v-model="newPart.kind" val="combined" label="Część łączona" style="margin-right: 10px;" />
                <q-radio dense v-model="newPart.kind" val="connecting" label="Część łącząca" />
              </div>
              <div class="mb-20">
                <p style="margin-bottom: 5px !important;">Typ części</p>
                <q-radio dense v-model="newPart.type" val="purchasing" label="Zakupowa" style="margin-right: 10px;" />
                <q-radio dense v-model="newPart.type" val="ownProduction" label="Własnej produkcji" style="margin-right: 10px;" />
                <q-radio dense v-model="newPart.type" val="fromCooperation" label="Z kooperacji" />
              </div>
              <input-component
                v-model="newPart.material"
                placeholder="Wpisz materiał z jakiego zrobiona jest część"
                class="mb-20">Materiał części:</input-component>
              <input-component
                v-model="newPart.mass"
                type="number"
                placeholder="Wpisz masę części (w gramach)"
                class="mb-20">Masa części [g]:</input-component>
              <input-component
                v-model="newPart.volume"
                type="number"
                placeholder="Wpisz objętość części"
                class="mb-20">Objętość części:</input-component>
              <input-component
                v-model="newPart.numberSameParts"
                type="number"
                placeholder="Wpisz liczbę takich samych części"
                class="mb-20">Liczba takich samych części:</input-component>
              <input-component
                v-model="newPart.numberFromAssemblyDrawing"
                type="number"
                placeholder="Wpisz numer z rysunku złożeniowego"
                class="mb-20">Numer z rysunku złożeniowego:</input-component>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <button-component flat v-close-popup @click="addPartModal = false">Anuluj</button-component>
            <button-component outline @click="addPart">Dodaj</button-component>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="actions-buttons">
        <button-component flat @click="router.replace('/projects')">Anuluj</button-component>
        <button-component v-if="!editProductId" outline @click="addProduct">Dodaj wyrób</button-component>
        <button-component v-if="editProductId" outline @click="editProduct">Edytuj wyrób</button-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import ButtonWithIcon from "../components/ButtonWithIcon.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import router from "../router";
import createInstance from "../services/apiBase";

const $q = useQuasar();
const route = useRoute();

const newProduct = ref({
  name: '',
  numberFromAssemblyDraw: 0,
  seriesSize: 0,
  yearlyProductionProgram: 0,
  DpT: 0,
  IZ: 0,
  TnZ: 0,
  TnP: 0,
  DpR: 0,
  parts: [],
  projectId: null
});

const projectId = ref(null);
const editProductId = ref(null);
onMounted(async () => {
  projectId.value = route.params.projectId;
  newProduct.value.projectId = projectId.value;

  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    editProductId.value = searchParams.split("=")[1];
  }

  if (editProductId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/product/" + editProductId.value);
      newProduct.value.name = result.data.product.name;
      newProduct.value.numberFromAssemblyDraw = result.data.product.numberFromAssemblyDraw
      newProduct.value.seriesSize = result.data.product.seriesSize
      newProduct.value.yearlyProductionProgram = result.data.product.yearlyProductionProgram
      newProduct.value.DpT = result.data.product.DpT
      newProduct.value.IZ = result.data.product.IZ
      newProduct.value.TnZ = result.data.product.TnZ
      newProduct.value.TnP = result.data.product.TnP
      newProduct.value.DpR = result.data.product.DpR
      newProduct.value.parts = result.data.product.parts;
    } catch (err) {
      console.log(err);
    }
  }
});

//Interaction with parts
const addPartModal = ref(false);
const newPart = ref({
  name: "",
  type: 'purchasing',
  material: '',
  mass: 0,
  volume: 0,
  kind: 'combined',
  numberSameParts: 0,
  numberFromAssemblyDrawing: 0,
});

const clearFieldAddPart = () => {
  newPart.value.name = "";
  newPart.value.kind = 'combined';
  newPart.value.type = "purchasing"
  newPart.value.material = "";
  newPart.value.mass = 0;
  newPart.value.volume = 0;
  newPart.value.numberSameParts = 0;
  newPart.value.numberFromAssemblyDrawing = 0;
};

const addPart = () => {
  if (validatePart()) {
    newProduct.value.parts.push({
      id: newProduct.value.parts.length + 1,
      name: newPart.value.name,
      kind: newPart.value.kind,
      type: newPart.value.type,
      material: newPart.value.material,
      mass: newPart.value.mass,
      volume: newPart.value.volume,
      numberSameParts: newPart.value.numberSameParts,
      numberFromAssemblyDrawing: newPart.value.numberFromAssemblyDrawing,
    });
    addPartModal.value = false;
    clearFieldAddPart();
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Nazwa części jest obowiązkowa",
      color: "red",
    });
  }
};

const isDeletePart = ref(false);
const confirmDeletePart = (id) => {
  const index = newProduct.value.parts
    .map((part) => {
      return part.id;
    })
    .indexOf(id);

  newProduct.value.parts.splice(index, 1);
  isDeletePart.value = false;
};

const validatePart = () => {
  if (newPart.value.name === '' || newPart.value.material === '' || newPart.value.mass === 0 || newPart.value.volume === 0) {
    return false
  } else {
    return true
  }
};

//Interactions with product
const addProduct = async () => {
  if (validateForm()) {
    const endNewProduct = {
      name: newProduct.value.name,
      numberFromAssemblyDraw: newProduct.value.numberFromAssemblyDraw,
      seriesSize: newProduct.value.seriesSize,
      yearlyProductionProgram: Number(newProduct.value.yearlyProductionProgram),
      DpT: Number(newProduct.value.DpT),
      IZ: Number(newProduct.value.IZ),
      TnZ: Number(newProduct.value.TnZ),
      TnP: Number(newProduct.value.TnP),
      DpR: Number(newProduct.value.DpR),
      Fd: newProduct.value.DpR * newProduct.value.TnZ * newProduct.value.IZ,
      Fe: newProduct.value.DpR * (newProduct.value.TnZ - newProduct.value.TnP) * newProduct.value.IZ,
      Pdz: newProduct.value.yearlyProductionProgram / newProduct.value.DpR,
      parts: newProduct.value.parts,
      projectId: newProduct.value.projectId
    }

    endNewProduct.p = Math.round((newProduct.value.yearlyProductionProgram / endNewProduct.Fe) * 100) / 100;
    endNewProduct.TTh = endNewProduct.Fe / newProduct.value.yearlyProductionProgram;
    endNewProduct.TTm = endNewProduct.TTh * 60;
    endNewProduct.TTs = endNewProduct.TTm * 60;
    endNewProduct.Pzm = endNewProduct.Pdz / 3;

    try {
      const instance = createInstance();
      instance.post("product", endNewProduct);
      router.replace("/projects");
    } catch (err) {
      console.log(err);
    }
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Produkt powinien mieć nazwę i przynajmniej jedną część",
      color: "red",
    });
  }
};

console.log(newProduct.value)

const editProduct = async () => {
  if (validateForm()) {
    const endEditProduct = {
      name: newProduct.value.name,
      numberFromAssemblyDraw: newProduct.value.numberFromAssemblyDraw,
      seriesSize: newProduct.value.seriesSize,
      yearlyProductionProgram: newProduct.value.yearlyProductionProgram,
      DpT: newProduct.value.DpT,
      IZ: newProduct.value.IZ,
      TnZ: newProduct.value.TnZ,
      TnP: newProduct.value.TnP,
      DpR: newProduct.value.DpR,
      Fd: newProduct.value.DpR * newProduct.value.TnZ * newProduct.value.IZ,
      Fe: newProduct.value.DpR * (newProduct.value.TnZ - newProduct.value.TnP) * newProduct.value.IZ,
      p: Math.round((newProduct.value.yearlyProductionProgram / newProduct.value.FE) * 100) / 100,
      TTh: newProduct.value.FE / newProduct.value.yearlyProductionProgram,
      TTm: newProduct.value.TTh * 60,
      TTs: newProduct.value.TTm * 60,
      Pdz: newProduct.value.yearlyProductionProgram / newProduct.value.DpR,
      Pzm: newProduct.value.Pdz / 3,
      parts: newProduct.value.parts,
      projectId: newProduct.value.projectId
    }

    endEditProduct.p = Math.round((newProduct.value.yearlyProductionProgram / endEditProduct.Fe) * 100) / 100;
    endEditProduct.TTh = endEditProduct.Fe / newProduct.value.yearlyProductionProgram;
    endEditProduct.TTm = endEditProduct.TTh * 60;
    endEditProduct.TTs = endEditProduct.TTm * 60;
    endEditProduct.Pzm = endEditProduct.Pdz / 3;

    try {
      const instance = createInstance();
      instance.put(`product/${editProductId.value}`, endEditProduct);
      router.replace("/projects");
    } catch (err) {
      console.log(err);
    }
  } else {
    $q.notify({
      position: "top-right",
      message:
        "Produkt powinien mieć nazwę i przynajmniej jedną część",
      color: "red",
    });
  }
};

const validateForm = () => {
  if (
    newProduct.value.name === '' ||
    newProduct.value.numberFromAssemblyDraw === 0 ||
    newProduct.value.seriesSize === 0 ||
    newProduct.value.parts.length === 0 ||
    newProduct.value.yearlyProductionProgram === Number(0) ||
    newProduct.value.DpT === Number(0) ||
    newProduct.value.IZ === 0 ||
    newProduct.value.TnZ === 0 ||
    newProduct.value.TnP === 0 ||
    newProduct.value.DpR === 0
  ) {
    return false;
  } else {
    return true;
  }
};
</script>

<style lang="scss">
.wrap-add-product {
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
    flex-wrap: wrap;
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
