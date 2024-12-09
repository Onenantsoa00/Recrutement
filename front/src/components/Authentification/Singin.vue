<template>
  <div class="bg-gray-200 p-6 rounded-lg drop-shadow-lg w-full max-w-lg">
    <h2 class="entete1 flex justify-center">Sign in</h2>
    <div>
      <input
        class="input-field input-formulaire mb-2"
        type="text"
        v-model="models.createAdmin.name"
        placeholder="Nom"
      />
      <input
        class="input-field input-formulaire mb-2"
        type="text"
        v-model="models.createAdmin.firstname"
        placeholder="Prénoms"
      />
      <input
        class="input-field input-formulaire mb-2"
        type="text"
        v-model="models.createAdmin.email"
        placeholder="Email"
      />
      <input
        class="input-field input-formulaire mb-2"
        type="password"
        v-model="models.createAdmin.password"
        placeholder="Mots de passe"
      />
      <input
        class="input-field input-formulaire mb-2"
        type="password"
        v-model="models.createAdmin.password_confirmation"
        placeholder="Validation Mots de passe"
      />

      <!-- Messages d'erreur -->
      <p v-if="errors.password" class="text-red-500 text-sm">
        {{ errors.password }}
      </p>
      <p v-if="errors.passwordMatch" class="text-red-500 text-sm">
        {{ errors.passwordMatch }}
      </p>
      <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>

      <button class="btn-hover-blue mt-5" @click="createAdministrateur">
        Valider
      </button>
    </div>
    <router-link :to="{ path: '/' }">
      <button>
        <h1 class="mt-3">Already have an account</h1>
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
      errors: {
        password: "",
        passwordMatch: "",
        email: "",
      },
      models: {
        createAdmin: {
          name: "",
          firstname: "",
          email: "",
          password: "",
          password_confirmation: "",
        },
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
      this.errors = {}; // Réinitialiser les erreurs

      // Validation du mot de passe
      if (this.models.createAdmin.password.length < 8) {
        this.errors.password =
          "Le mot de passe doit contenir au moins 8 caractères.";
        isValid = false;
      }

      if (
        this.models.createAdmin.password !==
        this.models.createAdmin.password_confirmation
      ) {
        this.errors.passwordMatch = "Les mots de passe ne correspondent pas.";
        isValid = false;
      }

      // Validation de l'email
      const emailRegex = /^[a-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!this.models.createAdmin.email) {
        this.errors.email = "L'email est requis.";
        isValid = false;
      } else if (!emailRegex.test(this.models.createAdmin.email)) {
        this.errors.email =
          "L'email doit commencer par une lettre minuscule, sans espaces et doit être au format valide.";
        isValid = false;
      }

      return isValid;
    },

    async createAdministrateur() {
      if (this.validateForm()) {
        const response = await axios.post(
          "http://localhost:8000/api/v1/administration/admin",
          this.models.createAdmin
        );
        if (response.data.success) {
          alert(response.data.message);
          this.authStore.setToken(response.data.token);
          this.infoAdmin.push(this.models.createAdmin);
          this.store.getListe(this.infoAdmin);
          console.log("ààààààààààààà", response);

          this.router.push("/home");
        } else {
          alert(
            "Erreur lors de la connexion. Veuillez vérifier vos informations."
          );
        }
      }
    },
  },
};
</script>

<style scoped></style>
