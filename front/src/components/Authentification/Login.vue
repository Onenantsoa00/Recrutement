<template>
  <div class="bg-gray-200 p-6 rounded-lg drop-shadow-lg w-full max-w-lg">
    <h1 class="entete1 flex justify-center">Login</h1>
    <div>
      <input
        type="text"
        class="input-field input-formulaire mb-2"
        placeholder="Email"
        v-model="models.insertInput.email"
      />

      <input
        type="password"
        class="input-field input-formulaire mb-2"
        placeholder="Mot de Passe"
        v-model="models.insertInput.password"
      />

      <p v-if="errors.password" class="text-red-500 text-sm">
        {{ errors.password }}
      </p>
      <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>

      <button @click="loginCont" class="btn-hover-blue mt-5">
        Se Connecter
      </button>
    </div>
    <router-link :to="{ path: '/signin' }">
      <button>
        <h1 class="mt-3">Sign up</h1>
      </button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthToken, useAppStore } from "../../stores/index.js";

import { useRouter } from "vue-router";

export default {
  data() {
    return {
      models: {
        insertInput: {
          email: "",
          password: "",
        },
      },
      errors: {
        password: "",
        email: "",
      },
      store: useAppStore(),
      infoAdmin: JSON.parse(localStorage.getItem("liste")) || [],
    };
  },
  setup() {
    const authStore = useAuthToken();
    const router = useRouter();
    return { authStore, router };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {};

      if (this.models.insertInput.password.length < 8) {
        this.error.password =
          "Le mot de passe doit contenir au moins 8 caractères.";
        isValid = false;
      }

      const emailRegex = /^[a-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

      if (!this.models.insertInput.email) {
        this.errors.email = "L'email est requis.";
        alert(this.errors.email);
        isValid = false;
      } else if (!emailRegex.test(this.models.insertInput.email)) {
        this.errors.email =
          "L'email doit commencer par une lettre minuscule, sans espaces et doit être au format valide.";
        alert(this.errors.email);
        isValid = false;
      }
      return isValid;
    },

    async loginCont() {
      try {
        if (this.validateForm()) {
          const response = await axios.post(
            "http://localhost:8000/api/v1/administration/login",
            this.models.insertInput
          );

          if (response.data.success) {
            alert(response.data.message);

            // Stocker le token dans le store
            this.authStore.setToken(response.data.token);

            // Stocker les données du user dans le store
            this.infoAdmin.push(this.models.insertInput);

            this.store.getListe(this.infoAdmin);

            // Redirection vers la page d'accueil
            this.router.push("/home");
          } else {
            alert(
              "Erreur lors de la connexion. Veuillez vérifier vos informations."
            );
          }
        }
      } catch (error) {
        console.error(error);
        alert(
          "Erreur lors de la connexion. Veuillez vérifier vos informations."
        );
      }
    },
  },
};
</script>

<style></style>
