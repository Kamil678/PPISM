<template>
  <div class="page">
    <div class="preview-time-wrap">
      <div class="preview-time-header">
        <div>Parametr</div>
        <div>Oznaczenie</div>
        <div>Wartość</div>
        <div>Jednostka</div>
      </div>
      <div class="preview-time-body">
        <div>
          <div>
            <p>Roczny program produkcji</p>
          </div>
          <div>
            <p>Brak</p>
          </div>
          <div>
            <p>{{ productTimes.yearlyProductionProgram }}</p>
          </div>
          <div>
            <p>[szt/rok]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Ilość dni roboczych w tygodniu</p>
          </div>
          <div>
            <p>DpT</p>
          </div>
          <div>
            <p>{{ productTimes.DpT }}</p>
          </div>
          <div>
            <p>[dni/tyg]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Ilość zmian na dzień roboczy</p>
          </div>
          <div>
            <p>IZ</p>
          </div>
          <div>
            <p>{{ productTimes.IZ }}</p>
          </div>
          <div>
            <p>[zm]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Ilość gozin na zmianę</p>
          </div>
          <div>
            <p>TnZ</p>
          </div>
          <div>
            <p>{{ productTimes.TnZ }}</p>
          </div>
          <div>
            <p>[h/zm]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Planowane przerwy</p>
          </div>
          <div>
            <p>TnP</p>
          </div>
          <div>
            <p>{{ productTimes.TnP }}</p>
          </div>
          <div>
            <p>[h/zm]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Dni roboczych w roku</p>
          </div>
          <div>
            <p>DpR</p>
          </div>
          <div>
            <p>{{ productTimes.DpR }}</p>
          </div>
          <div>
            <p>[dni]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Dostępny fundusz czasu pracy</p>
          </div>
          <div>
            <p>Fd</p>
          </div>
          <div>
            <p>{{ productTimes.Fd }}</p>
          </div>
          <div>
            <p>[h/rok]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Efektywny fundusz czasu pracy</p>
          </div>
          <div>
            <p>Fe</p>
          </div>
          <div>
            <p>{{ productTimes.Fe }}</p>
          </div>
          <div>
            <p>[h/rok]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Natężenie produkcji</p>
          </div>
          <div>
            <p>p</p>
          </div>
          <div>
            <p>{{ productTimes.p }}</p>
          </div>
          <div>
            <p>[szt/h]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Czas taktu godzinowy</p>
          </div>
          <div>
            <p>TTh</p>
          </div>
          <div>
            <p>{{ productTimes.TTh }}</p>
          </div>
          <div>
            <p>[h/szt]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Czas taktu minutowy</p>
          </div>
          <div>
            <p>TTm</p>
          </div>
          <div>
            <p>{{ productTimes.TTm }}</p>
          </div>
          <div>
            <p>[min/szt]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Czas taktu sekundowy</p>
          </div>
          <div>
            <p>TTs</p>
          </div>
          <div>
            <p>{{ productTimes.TTs }}</p>
          </div>
          <div>
            <p>[sek/szt]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Produkcja zmianowa</p>
          </div>
          <div>
            <p>Pzm</p>
          </div>
          <div>
            <p>{{ productTimes.Pzm }}</p>
          </div>
          <div>
            <p>[szt/zm]</p>
          </div>
        </div>
        <div>
          <div>
            <p>Produkcja dzienna</p>
          </div>
          <div>
            <p>Pdz</p>
          </div>
          <div>
            <p>{{ productTimes.Pdz }}</p>
          </div>
          <div>
            <p>[szt/dz]</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import createInstance from "../services/apiBase";

// const projectId = ref(null);
const productId = ref(null);
const productTimes = ref({
  yearlyProductionProgram: null,
  DpT: null,
  IZ: null,
  TnZ: null,
  TnP: null,
  DpR: null,
  Fd: null,
  Fe: null,
  Pdz: null,
  p: null,
  TTh: null,
  TTm: null,
  TTs: null,
  Pzm: null,
})
onMounted(async () => {
  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    productId.value = searchParams.split("=")[1];
  }

  if (productId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/product/" + productId.value);
      productTimes.value = result.data.product
    } catch (err) {
      console.log(err);
    }
  }
});
</script>
<style lang="scss">
.preview-time-wrap {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  max-width: 50%;
  margin: 0 auto;

  .preview-time-header {
    display: flex;
    align-items: center;
    background-color: yellow;
    font-weight: 500;
    border-bottom: 1px solid #000;

    &>div {
      width: 25%;
      border-right: 1px solid #000;
      text-align: center;

      &:first-child {
        width: 50%;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .preview-time-body {
    div {
      display: flex;
      align-items: center;

      &>div {
        width: 25%;
        border-right: 1px solid #000;
        text-align: center;
        border-bottom: 1px solid #000;

        &:first-child {
          width: 50%;
        }

        &:last-child {
          border-right: none;
        }

        p {
          width: 100%;
        }
      }
    }
  }
}
</style>
