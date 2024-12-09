<template>
  <div class="">
    <h1 class="entete1">Mise à jour Suivies</h1>

    <div class="creationTableau">
      <table class="table1">
        <thead
          class="text-xs text-gray-950 bg-gray-300 dark:bg-gray-700 dark:text-red-500"
        >
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">
              {{ dataUpdate.nom_clt }}
            </div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">
              {{ dataUpdate.contact }}
            </div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">
              {{ dataUpdate.nom_post }}
            </div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">
              <select v-model="models.updateSuivi.id_etape">
                <option
                  v-for="(nomStatus, index) in this.models.updateStatus
                    .nomStatus"
                  :key="index"
                  :value="nomStatus.id"
                >
                  {{ nomStatus.id }}
                  {{ nomStatus.nom_etape }}
                </option>
              </select>
            </div>
          </th>

          <th scope="col" class="paddingxy">
            <router-link :to="{ path: '/suivie' }">
              <button class="btn-hover-green" @click="updateData">
                Validate
              </button>
            </router-link>
          </th>
        </thead>
      </table>
    </div>

    <!-- <div class="hiden">{{ dataUpdate.client_id }}</div> -->
    <!-- <div class="data">{{ dataUpdate.nom_clt }}</div>
        <div class="data">{{ dataUpdate.contact }}</div>
        <div class="data">{{ dataUpdate.nom_post }}</div>
        <div class="data">
          <select v-model="models.updateSuivi.id_etape">
            <option
              v-for="(nomStatus, index) in this.models.updateStatus.nomStatus"
              :key="index"
              :value="nomStatus.id"
            >
              {{ nomStatus.id }}
              {{ nomStatus.nom_etape }}
            </option>
          </select>
        </div>
        <router-link :to="{ path: '/suivie' }">
          <button @click="updateData">Validate</button>
        </router-link> -->
  </div>
</template>

<script>
/* 
import { useAppStore } from "../../stores/index.js"; */
import axios from "axios";
import { axiosConfig } from "../../../API";

export default {
  data() {
    return {
      models: {
        updateStatus: {
          nomStatus: [],
        },
        updateSuivi: {
          id_etape: "",
          idSuivi: "", // id du client lié au suivi
        },
      },

      config: axiosConfig(),
      indice: null,
      dataUpdate: [], // objet à mettre à jour
    };
  },

  mounted() {
    /* this.getStatus();
    const store = useAppStore();
    this.indice = this.$route.params.id;
    this.idLocalStorage = localStorage.getItem("liste");

    if (store.liste && this.indice !== undefined) {
      this.dataUpdate = store.liste[this.indice];
      this.id_etape = this.dataUpdate.nom_etape;
    } */
    this.getStatus();
    this.getOneData();
  },
  watch: {
    "models.updateSuivi.id_etape"(newValue) {
      console.log("Recherche:", newValue);
    },
    "dataUpdate.client_id"(newValue) {
      console.log("dataUpdate:", newValue);
    },
  },
  methods: {
    getStatus() {
      axios
        .get("http://localhost:8000/api/v1/listeAttent/getStatus", this.config)
        .then((res) => {
          this.models.updateStatus.nomStatus = res.data.data;
        });
    },

    getOneData() {
      axios
        .get(
          `http://localhost:8000/api/v1/suivi/getOneSuivi/${this.$route.params.id}`,
          this.config
        )
        .then((res) => {
          this.dataUpdate = res.data.data;
        });
    },

    updateData() {
      this.models.updateSuivi.id_etape = this.models.updateSuivi.id_etape;
      this.models.updateSuivi.idSuivi = this.dataUpdate.client_id; // id du client lié au suivi
      axios
        .put(
          `http://localhost:8000/api/v1/suivi/updateSuivi/${this.$route.params.id}`,
          { ...this.models.updateSuivi },
          this.config
        )
        .then((res) => {
          res.message;
          console.log(this.models.updateSuivi);
        });
    },
    /*updateData() {
       this.dataUpdate.nom_etape = this.id_etape;
      const store = useAppStore();
      store.liste[this.indice] = this.dataUpdate;
      localStorage.setItem("liste", JSON.stringify(store.liste));
    }*/
  },
};
</script>

<style>
/* 
.hiden {
  display: inline;
} */
</style>
