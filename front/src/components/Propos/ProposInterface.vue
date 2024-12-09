<template>
<div class="flex justify-center">

<div class="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-lg">
  <h1 class="text-2xl font-bold mb-4">Définition du Poste</h1>
  <div class="space-y-4">
    <input
      type="text"
      v-model="models.createPost.nom_post"
      placeholder="Nom du Post"
      class="input-field input-formulaire"
    />
    <input
      type="text"
      v-model="models.createPost.criteres"
      placeholder="Critère"
      class="input-field input-formulaire"
    />
    <input
      type="text"
      v-model="models.createPost.exp_att"
      placeholder="Expérience Attendue"
      class="input-field input-formulaire"
    />
    <input
      type="text"
      v-model="models.createPost.cert_nec"
      placeholder="Certificat nécessaire"
      class="input-field input-formulaire"
    />
    <input
      type="number"
      v-model="models.createPost.age_req"
      placeholder="Âge Requis"
      class="input-field input-formulaire"
    />
    <input
      type="date"
      v-model="models.createPost.fin_cand"
      placeholder="Fin de Candidature"
      class="input-field input-formulaire"
    />
    <button
      @click="validerPost"
      class="btn-hover-green"
    >
      Valider
    </button>
  </div>
</div>

</div>
</template>

<script>
import axios from "axios";
import { axiosConfig } from "../../../API";
export default {
  data() {
    return {
      models: {
        createPost: {
          nom_post: "",
          criteres: "",
          exp_att: "",
          cert_nec: "",
          age_req: "",
          fin_cand: "",
        },
      },
      config:axiosConfig(),
      errorMessages: [],
    };
  },
  /* watch: {
    "models.createPost.nom_post": function (newValue) {
      console.log("nom post: ", newValue);
    },
  }, */
  methods: {
    validateAge(){
      const age = parseInt(this.models.createPost.age_req, 10);
      if(isNaN(age)){
        this.errorMessages.push("L'âge doit être un nombre entier.");
        return false;
      }
      if((age < 0) || (age > 100)){
        this.errorMessages.push("l'âge doit comprit entre 0-100")
        return false;
      }
      return true;
    },

    validateDate(){
      const findCand = new Date(this.models.createPost.fin_cand);
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (findCand<today){
        this.errorMessages.push("Erreur de date")
        return false;
      }
      return true;
    },

    validerPost() {
      this.errorMessages=[]
      if( !this.validateAge () || !this.validateDate() ){
        alert(this.errorMessages)
        return;
      }
      axios
        .post("http://localhost:8000/api/v1/a_propos/createProps", this.models.createPost, this.config)
        .then((res) => {
          alert(res.data.message);
          this.models.createPost = {
            nom_post: "",
            criteres: "",
            exp_att: "",
            cert_nec: "",
            age_req: "",
            fin_cand: "",
          };
        })
        .catch((error) => {
          console.log(error);
          alert("Erreur lors de la création du poste");
        });
    },
  },
};
</script>

<style>/* 
.contonaire {
  display: flex;
  align-items: center; 
  justify-content: center;
  margin: 0; 
}


.formulaire {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #f5f5f5;
}
input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
}
button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
} */
</style>
