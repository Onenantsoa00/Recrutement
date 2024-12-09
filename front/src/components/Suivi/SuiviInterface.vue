<template>
  <div class="">
    <h1 class="entete1">Suivies</h1>
    <div class="mb-7">
      <input v-model="search" placeholder="Recherche Candidat / Post / Etat" class="input-search"/>
      <button class="btn-recherche ml-5">Rechercher</button>
    </div>

    <div class="creationTableau">
      <table class="table1">
        <thead class="en-tete-1">
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Nom du Candidat</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Contact</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Post</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Etat</div>
          </th>
          <th></th>
          <th></th>
        </thead>

        <tbody v-for="(listAttent, index) in filteredListAttentInSuivi" :key="index">
          <tr class="tr-tableau">
            <th scope="row" class="th-tableau">
              {{ listAttent.nom_clt }}
              <router-link :to="{ path: '/showOneDataClient/' + listAttent.client_id }">
                <span class="dossierImg" @click="showDataClient">
                  <button>
                    <img src="../../assets/svg/folder.svg" alt="" class="w-5 h-5 hover:scale-150"/>
                  </button>
                </span>
              </router-link>
            </th>

            <td scope="row" class="td-tableau">
              {{ listAttent.contact }}
            </td>

            <td scope="row" class="td-tableau">
              {{ listAttent.nom_post }}
            </td>

            <td scope="row" class="td-tableau">
              {{ listAttent.nom_etape }}
            </td>
            <td scope="row" class="td-tableau">
              <router-link :to="{ path: '/updateSuivi/' + listAttent.id }">
                <button class="btn-hover-blue">Edit</button>
              </router-link>
            </td>
            <td scope="row" class="td-tableau">
              <button @click="deleteSuivi(index)" class="btn-hover-red">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ----------------------- -->
    <!-- <div class="" v-for="(listAttent, index) in filteredListAttentInSuivi" :key="index">
      <div class="data">
        {{ listAttent.nom_clt }}
        <router-link :to="{ path: '/showOneDataClient/' + listAttent.client_id }">
          <span class="dossierImg" @click="showDataClient">
            <button>
              <img src="../../assets/svg/folder.svg" alt="" />
            </button>
          </span>
        </router-link>
      </div>
      <div class="data">{{ listAttent.id }}</div>
      <div class="data">{{ listAttent.contact }}</div>
      <div class="data">{{ listAttent.nom_post }}</div>
      <div class="data">{{ listAttent.nom_etape }}</div>
      <router-link :to="{ path: '/updateSuivi/' + listAttent.id }">
        <button>Edit</button>
      </router-link>
      <button @click="deleteSuivi(index)">Delete</button>
    </div>-->
  </div>
</template>

<script>
/* 
import { useAppStore } from '../../stores/index.js'; */
import axios from "axios";
import { axiosConfig } from "../../../API";
export default {
  data() {
    return {
      listAttent: [],
      idList: "",
      search: "",
      config: axiosConfig(),
    };
  },

  mounted() {
    /* 
    const store = useAppStore();
    this.listAttent = store.liste;
    console.log('==========', this.listAttent) */
    this.getListeSuivi();
  },

  computed: {
    filteredListAttentInSuivi() {
      const searchRegex = new RegExp(this.search, "i"); // Regex pour recherche insensible à la casse
      return this.listAttent.filter(
        (list) =>
          searchRegex.test(list.nom_clt) ||
          searchRegex.test(list.nom_post) ||
          searchRegex.test(list.nom_etape)
      );
    },
  },

  methods: {
    getListeSuivi() {
      axios.get(`http://localhost:8000/api/v1/suivi/getSuivi`, this.config).then((res) => {
        this.listAttent = res.data.data;
      });
    },
    deleteSuivi(index) {
      this.idList = this.listAttent[index].id;
      // console.log("++++++++++++++++",this.idList[index].id);
      axios
        .delete(`http://localhost:8000/api/v1/suivi/deleteSuivi/${this.idList}`, this.config)
        .then((res) => {
          alert(res.data.message);
        });
      window.location.reload();
    },
  },

  watch: {
    search(newValue) {
      console.log("Recherche:", newValue);
    },
  },
};
</script>

<style>
/* 
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
}
span {
  width: 100px;
  height: 50%;
} */
</style>
