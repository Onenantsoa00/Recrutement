<template>
  <div class="">
    <h1 class="entete1">Liste d'attente</h1>

    <div class="mb-7">
      <input v-model="searchListeAttente" placeholder="Recherche" class="input-search" />
      <button class="btn-recherche ml-5">Rechercher</button>
    </div>

    <div class="creationTableau">
      <table class="table1">
        <thead class="en-tete-1">
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">nom poste</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">liste personne intéressés</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Contact</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Fin de candidature</div>
          </th>
          <th></th>
          <th></th>
        </thead>

        <tbody v-for="(listeAttente, index) in filteredListAttentInList" :key="index">
          <tr class="tr-tableau">
            <th scope="row" class="th-tableau">
              {{ listeAttente.nom_post }}
            </th>
            <td scope="row" class="td-tableau">
              {{ listeAttente.nom_clt }}
            </td>
            <td scope="row" class="td-tableau">
              {{ listeAttente.contact }}
            </td>
            <td scope="row" class="td-tableau">
              {{ listeAttente.fin_cand }}
            </td>
            <td scope="row" class="td-tableau">
              <button
                class="btn-hover-blue"
                @click="getData(listeAttente, index)"
                type=""
              >
                Suivre
              </button>
            </td>
            <td scope="row" class="td-tableau">
              <button
                class="btn-hover-red"
                @click="deletClient(listeAttente, index)"
                type=""
              >
                Refuser
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <div class="contonaire">
      <div
      class="liste"
      v-for="(listeAttente, index) in filteredListAttentInList"
      :key="index"
    >
      <div
        class=""
        v-for="(listeAttente, index) in filteredListAttentInList"
        :key="index"
      >
        <div class="hidenne">
          <div class="data">{{ listeAttente.nom_post }}</div>
          <div class="data">{{ listeAttente.nom_clt }}</div>

          <div class="data">{{ listeAttente.contact }}</div>
          <div class="data">
        <select v-model="optionSelectionner">
          <option
            v-for="(nomStatus, index) in this.nomStatus"
            :key="index"filteredListAttentInList
            :value="nomStatus.nom_etape"
          >
            {{ nomStatus.nom_etape }}
          </option>
        </select>
        <p>ito {{ optionSelectionner }}</p>
      </div>

          <div class="data">{{ listeAttente.fin_cand }}</div>
          <div class="hiden">{{ listeAttente.nom_etape }}</div>
          <div class="hiden">{{ listeAttente.post_id }}</div>
          <div class="hiden">{{ listeAttente.client_id }}</div>
          <div class="data">
            <button @click="getData(listeAttente, index)" type="">Suivre</button>
            <button @click="deletClient(listeAttente, index)" type="">Refuser</button>
          </div>
        </div>
      </div> 
    </div>-->
  </div>
</template>

<script>
import axios from "axios";
import { axiosConfig } from "../../../API.js";
import { useAppStore } from "../../stores/index.js";
export default {
  data() {
    return {
      optionSelectionner: "",
      nomStatus: [],
      listeAttente: [],
      store: useAppStore(),
      listeTable: JSON.parse(localStorage.getItem("liste")) || [],
      searchListeAttente: "",
      models: {
        insertSuivi: {
          id_clt: null,
          id_post: null,
        },
      },
      config: axiosConfig(),
    };
  },

  mounted() {
    /* this.getStatus(); */
    this.getListeAttent();
    const config = axiosConfig();
  },

  computed: {
    filteredListAttentInList() {
      const regs = new RegExp(this.searchListeAttente, "i");
      return this.listeAttente.filter((list) => regs.test(list.nom_post));
    },
  },

  methods: {
    //get data in etape
    /* getStatus() {
      axios.get("http://localhost:8000/api/v1/listeAttent/getStatus").then((res) => {
        this.nomStatus = res.data.data;
      });
    }, */

    //get data nom_post, nom_clt, contact, find_cand, nom_etapte
    getListeAttent() {
      axios
        .get("http://localhost:8000/api/v1/listeAttent/getListeAttente", this.config)
        .then((res) => {
          this.listeAttente = res.data.data;
        });
    },

    //send in local storage and suppr data
    getData(listeAttent, index) {
      const idListeAttente = listeAttent.id;
      console.log("==================", idListeAttente);
      if (confirm("Suivre cette personne ? ")) {
        this.listeAttente = this.listeAttente.filter(
          (item) => item !== this.listeAttente[index]
        );

        /* this.listeTable.push(listeAttent);

        this.store.getListe(this.listeTable);

        console.log("+++++++++", this.listeAttente);
        console.log("++++++++++++++++", this.listeTable);
        /* console.log(this.listeAttente);
        console.log("=========", index); */
        this.models.insertSuivi.id_clt = listeAttent.client_id;
        this.models.insertSuivi.id_post = listeAttent.post_id;

        console.log("=======-------========", this.models.insertSuivi.id_clt);
        console.log("=======°°°°°°°°°======", this.models.insertSuivi.id_post);

        console.log("=========+++++++========", { ...this.models.insertSuivi });

        axios
          .post(
            `http://localhost:8000/api/v1/suivi/insertSuivi`,
            {
              ...this.models.insertSuivi,
            },
            this.config
          )
          .then((res) => {
            console.log(this.models.insertSuivi);
            alert(res.data.message);
          });

        /* alert("Personne à suivie : " , res.message) */
        axios
          .delete(
            `http://localhost:8000/api/v1/listeAttent/deleteListeAttente/${idListeAttente}`,
            this.config
          )
          .then((res) => {
            console.log(res);
            console.log(res.data.message);
          });
      }
    },
    deletClient(listeAttent, index) {
      const idListeAttente = listeAttent.id;
      console.log(idListeAttente);
      axios
        .delete(
          `http://localhost:8000/api/v1/listeAttent/deleteListeAttente/${idListeAttente}`,this.config
        )
        .then((res) => {
        });
        window.location.reload();
    },
  },
};
</script>

<style>
/* 
.hiden2 {
  display: inline;
}

.hiden {
  display: none;
}

.data {
  margin: 20px 30px;
}

.liste {
  display: flex;
  align-items: center;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.recherche {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 20px 0px;
}
input {
  padding: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-right: 10px;
} */
</style>
