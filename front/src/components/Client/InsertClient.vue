<template>
  <div class="flex justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-4">{{ models.nomPost.nom_post }}</h2>
      <div class="space-y-4">
        <input
          type="text"
          v-model="models.createClients.nom_clt"
          placeholder="Nom"
          class="input-field input-formulaire"
        />
        <input
          type="text"
          v-model="models.createClients.prenom_clt"
          placeholder="Prénoms"
          class="input-field input-formulaire"
        />
        <input
          type="text"
          v-model="models.createClients.email"
          placeholder="Email"
          class="input-field input-formulaire"
        />
        <input
          type="text"
          v-model="models.createClients.contact"
          placeholder="Contact"
          class="input-field input-formulaire"
        />
        <button class="btn-hover-green" @click="insertClients">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { axiosConfig } from "../../../API.js";
export default {
  data() {
    return {
      models: {
        createClients: {
          nom_clt: "",
          prenom_clt: "",
          email: "",
          contact: "",
        },
        nomPost: {
          nom_post: "",
        },
      },
      config: axiosConfig(),
      errorEmail: "",
    };
  },
  mounted() {
    //prend l'id d'un autre page
    const idPropos = this.$route.params.id;
    console.log(idPropos);
    console.log(this.config);
    axios
      .get(`http://localhost:8000/api/v1/a_propos/createClient/${idPropos}`,this.config)
      .then((res) => {
        this.models.nomPost.nom_post = res.data.data[0].nom_post;
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
      });
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errorEmail = {};
      const emailRegex = /^[a-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(this.models.createClients.email)) {
        this.errorEmail = "Veuillez entrer une adresse email valide";
        alert(this.errorEmail)
        isValid = false;
      }
      return isValid;
    },

    async insertClients() {
      if (this.validateForm()) {
        console.log(this.config);
        axios
          .post(
            "http://localhost:8000/api/v1/clients/createClient",
            {
              ...this.models.createClients,
              id_post: this.$route.params.id,
            },
            this.config
          )
          .then((res) => {
            /* const clients = res.data.getData.map(item => item.id);
            const idClient = Math.max(...clients)
  
            console.log("=============",idClient);*/
            console.log(res.data.message);

            this.models.createClients = {
              nom_clt: "",
              prenom_clt: "",
              email: "",
              contact: "",
            };
          })
          .catch((error) => {
            console.log(error);
            alert("Error creating clients ");
          });
      }
    },
  },
};
</script>

<style>
/* 
.cont {
  display: flex;
  justify-content: center;
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
