<template>
  <div class="page">
    <div v-if="operations.length > 0">
      <h3 style="font-size: 24px; line-height: 26px; margin: 30px 0 20px 0">
        Podgląd karty technologicznej:
      </h3>
      <div class="preview-technolgical-card">
        <div class="header">
          <div class="place label">Politechnika Krakowska</div>
          <div class="title label">
            <p>Karta technologiczna montażu</p>
          </div>
          <div class="product-name">
            <div class="label">Nazwa montowanego wyrobu</div>
            <div class="data">{{ project.product.name }}</div>
          </div>
          <div class="picture-number">
            <div class="label">Numer rysunku złożeniowego</div>
            <div class="data">{{ project.product.numberFromAssemblyDraw }}</div>
          </div>
          <div class="size-series">
            <div class="label">Wielkość serii</div>
            <div class="data">{{ project.product.seriesSize }}</div>
          </div>
        </div>
        <div class="description-rows-wrap">
          <div class="operation-number">Nr operacji</div>
          <div class="operation-content">Treść operacji</div>
          <div class="position">Stanowisko</div>
          <div class="position-symbol">Symbol stanowiska</div>
          <div class="time-norms">
            <div>Normy czasu</div>
            <div class="specific-times">
              <div>tpz</div>
              <div>tj</div>
              <div>Nt</div>
            </div>
          </div>
        </div>
        <div
          v-if="operations.length > 0"
          v-for="operation in operations"
          class="rows-wrap">
          <div class="operation-number">
            {{ operation.operationNumber }}
          </div>
          <div class="operation-content">
            {{ operation.operationContent }}
          </div>
          <div class="position">
            {{ operation.position }}
          </div>
          <div class="position-symbol">
            {{ operation.positionSymbol }}
          </div>
          <div class="time-norms">
            <div>{{ operation.tpz }}</div>
            <div>{{ operation.tj }}</div>
            <div>{{ operation.Nt }}</div>
          </div>
        </div>
      </div>
      <h3 style="font-size: 24px; line-height: 26px; margin: 50px 0 20px 0">
        Podgląd grafów następstw montażowych:
      </h3>
      <div v-for="operation in operations">
        <p>{{ operation.id }}. {{ operation.operationContent }}</p>
        <vue-mermaid-string v-if="operation.textToSequenceGraph" :value="operation.textToSequenceGraph" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import createInstance from "../services/apiBase";
import VueMermaidString from 'vue-mermaid-string'

const $q = useQuasar();
const route = useRoute();

const project = ref(null)
const operations = ref([]);
const projectId = ref(null);
const technologicalDocumentationsId = ref(null);
onMounted(async () => {
  projectId.value = route.params.projectId;
  if (projectId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/project/" + projectId.value);

      project.value = result.data.project;
    } catch (err) {
      console.log(err);
    }
  }

  if (window.location.search.includes("id")) {
    const searchParams = window.location.search;
    technologicalDocumentationsId.value = searchParams.split("=")[1];
  }
  if (technologicalDocumentationsId.value) {
    try {
      const instance = createInstance();
      const result = await instance.get("/technological-documentations/" + technologicalDocumentationsId.value);

      operations.value = result.data.technologicalDocumentations.operations;
    } catch (err) {
      console.log(err);
    }
  }
})
</script>
