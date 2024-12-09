<template>
  <div class="flex justify-center mb-10 items-center bg-gray-300 mx-32 py-12 border-e-black rounded">
    <div class="flex inline-flex">
      <div class="border-4 p-5 mx-[5px]">
        <h2>Poste en Cours</h2>
        <span class="text-[20px] font-bold">[ {{ nombrePost }} ] </span>
      </div>
      <div class="border-4 p-5">
        <h2>Candidature</h2>
        <span class="text-[20px] font-bold">[{{ nombreCandidate }}]</span>
      </div>
    </div>
  </div>

<!-- <tbody v-for="(listAttent, index) in filteredListAttentInSuivi" :key="index">
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
        </tbody> -->

<!-- <tbody v-for="(list, index) in listePost" :key="index">

  <tr class="tr-tableau">

  </tr>

</tbody>
 -->


  <div class="mb-2 font-bold" v-for="(list, index) in listePost" :key="index">
    <div class="flex justify-between items-center">

      <h3>{{ list.nom_post }}</h3>
      <div v-if="list.timeRemaining" class="flex justify-between">
        <p>J : {{ list.days }} &emsp;</p>
        <p>H : {{ list.hours }} &emsp;</p>
        <p>M : {{ list.minutes }} &emsp;</p>
        <p>S : {{ list.seconds }} </p>
      </div>
      <div v-else>
        <p>Fin Candidature</p>
      </div>
      <span>{{ list.fin_cand }}</span>
      <div><button class="btn-hover-blue">Edit</button></div>
      <div><button class="btn-hover-red">Supprimer</button></div>
    </div>
  </div> 
</template>

<script>
import axios from 'axios';
import { axiosConfig } from '../../../API';

export default {
  data() {
    return {
      nombrePost: 0,
      nombreCandidate: 0,
      listePost: [],
      timer: null,
      config: axiosConfig(),
    };
  },
  mounted() {
    this.getNombrePost();
    this.getNombreCandidate();
    this.getListePost();

    this.updateCountDown();
    this.timer = setInterval(this.updateCountDown, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getNombrePost() {
      axios.get('http://localhost:8000/api/v1/a_propos/getProposInClient', this.config).then((res) => {
        this.nombrePost = res.data.total;
      });
    },
    getNombreCandidate() {
      axios.get('http://localhost:8000/api/v1/home/dashboard', this.config).then((res) => {
        this.nombreCandidate = res.data.data.length;
      });
    },
    
  getListePost() {
    axios.get('http://localhost:8000/api/v1/home/dashdoardListPost', this.config).then((res) => {
      this.listePost = res.data.data.map(post => {
        const deadlineDate = new Date(post.fin_cand);
        const formattedDate = deadlineDate.toISOString().split('T')[0]; 
        return {
          ...post,
          fin_cand: formattedDate,  
          deadline: deadlineDate.getTime(),
          timeRemaining: true,
          timeDiff: deadlineDate.getTime() - new Date().getTime()
        };
      });
    });
  },
    getTimeDifference(deadline) {
      return deadline - new Date().getTime();
    },
    updateCountDown() {
      this.listePost = this.listePost.map(post => {
        const timeDiff = this.getTimeDifference(post.deadline);
        
        if (timeDiff <= 0) {
          return { ...post, timeRemaining: false };
        }

        return {
          ...post,
          timeRemaining: true,
          timeDiff,
          days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
        };
      });
    },
  },
};
</script>

<style>/* 
.alignement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}
.poste {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  background-color: blue;
  margin-left: 15%;
}
.candidat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  background-color: blue;
  margin-right: 15%;
} */
</style>