<template>
  <div class="">
    <h1 class="entete1">{{ oneClient.nom_clt }}</h1>

    <div class="creationTableau">
      <table class="table1">
        <thead
          class="text-xs text-gray-950 bg-gray-300 dark:bg-gray-700 dark:text-red-500"
        >
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Nom du Candidat</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Prénoms du Candidat</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Email</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Contact</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Etapes</div>
          </th>
        </thead>
        <tbody>
          <tr class="tr-tableau">
            <th scope="row" class="th-tableau">
              {{ oneClient.nom_clt }}
            </th>
            <td scope="row" class="td-tableau">
              {{ oneClient.prenom_clt }}
            </td>
            <td scope="row" class="td-tableau">
              {{ oneClient.email }}
            </td>
            <td scope="row" class="td-tableau">
              {{ oneClient.contact }}
            </td>
            <td scope="row" class="td-tableau">
              {{ oneClient.nom_etape }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { axiosConfig } from "../../../API";
export default {
  data() {
    return {
      oneClient: [],
      config: axiosConfig(),
    };
  },

  mounted() {
    this.getOneClient();
  },

  methods: {
    getOneClient() {
      axios
        .get(
          `http://localhost:8000/api/v1/suivi/showOneClient/${this.$route.params.id}`,
          this.config
        )
        .then((res) => {
          this.oneClient = res.data.data;
        });
    },
  },
};
</script>

<style></style>
