<template>
  <div>
    <div class="creationTableau">
      <table class="table1">
        <thead class="en-tete-1">
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Nom du Post</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Critéres</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Expérience Attendue</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Certificat necessaire</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Age Requit</div>
          </th>
          <th scope="col" class="paddingxy">
            <div class="alignement-flex">Fin de candidature</div>
          </th>
          <th></th>
        </thead>

        <tbody
          class="liste"
          v-for="(listpost, index) in this.listpost"
          :key="index"
        >
          <tr class="tr-tableau">
            <th scope="row" class="td-tableau">
              {{ listpost.nom_post }}
            </th>
            <td scope="row" class="td-tableau">
              {{ listpost.criteres }}
            </td>
            <td scope="row" class="td-tableau">
              {{ listpost.exp_att }}
            </td>
            <td scope="row" class="td-tableau">
              {{ listpost.cert_nec }}
            </td>
            <td scope="row" class="td-tableau">
              {{ listpost.age_req }} - 60 ans
            </td>
            <td scope="row" class="td-tableau">
              {{ listpost.fin_cand }}
            </td>
            <td scope="row" class="td-tableau">
              <router-link
                :to="{ path: '/client/' + listpost.id + '/insertClient' }"
              >
                <button class="btn-hover-green">Intérresser</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 
      <div class="liste" v-for="(listpost, index) in this.listpost" :key="index">
        <div>{{ listpost.nom_post }}</div>
        <div>{{ listpost.criteres }}</div>
        <div>{{ listpost.exp_att }}</div>
        <div>{{ listpost.cert_nec }}</div>
        <div>{{ listpost.age_req }}</div>
        <div>{{ listpost.fin_cand }}</div>
        <div class="button">
          <router-link :to="{path : '/client/'+listpost.id+'/insertClient'}">
            <button>Intérresser</button>
          </router-link>
        </div>
      </div>
 -->
  </div>
</template>

<script>
import axios from "axios";
import { axiosConfig } from "../../../API";
export default {
  data() {
    return {
      listpost: [],
      config: axiosConfig(),
    };
  },
  mounted() {
    /* console.log("io fa mande le") */
    this.getpost(); /* methode qui va appeler la fonction getpost() pour récuperer les données */
    console.log(this.config);
  },
  methods: {
    getpost() {
      axios
        .get(
          "http://localhost:8000/api/v1/a_propos/getProposInClient",
          this.config
        )
        .then((res) => {
          this.listpost = res.data.data;
          /* console.log(this.listpost) */
        });
    },
  },
};
</script>

<style>
/* 
.data {
  display: flex;
  align-items: center;
}
.liste {
  display: flex;
  align-items: center;
} */
</style>
