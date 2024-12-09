<template>
  <div class="w-screen h-screen flex">
    <!-- sidebare -->
    <div class="w-[300px] h-full bg-pink-200 text-white" v-show="sidebarOpen">
      <div class="h-[50px] bg-gray-200 flex justify-start items-center">
        <div class="px-[20px]">
          <img
            src="../../assets/image/Logotype_COULEUR.png"
            class="w-36 h-12"
          />
        </div>
      </div>
      <div class="h-[calc(100vh-50px)] bg-[#68465f] py-[20px]">
        <div class="px-[20px] flex flex-col space-y-[10px]">
          <div class="h-auto">
            <router-link to="/about" class="check-sidebar"
              ><!-- translate rotate scale -->
              <div>
                <svg
                  class="mx-4 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    d="M7.825.12a.5.5 0 0 0-.65 0L0 6.27v7.23A1.5 1.5 0 0 0 1.5 15h4a.5.5 0 0 0 .5-.5v-3a1.5 1.5 0 0 1 3 0v3a.5.5 0 0 0 .5.5h4a1.5 1.5 0 0 0 1.5-1.5V6.27z"
                  />
                </svg>
              </div>
              <div>Home</div>
            </router-link>
            <router-link to="/propos" class="check-sidebar">
              <div>
                <svg
                  class="mx-4 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                  />
                </svg>
              </div>
              <div>Ajout de post</div>
            </router-link>

            <router-link to="/liste_d_attente" class="check-sidebar">
              <div>
                <svg
                  class="mx-4 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill="currentColor"
                    d="M13.903 9.073a5.026 5.026 0 0 0-5.019 5.021c0 2.77 2.25 5.022 5.019 5.022a5.03 5.03 0 0 0 5.023-5.022a5.03 5.03 0 0 0-5.023-5.021m3.327 4.348l-3.293 1.556a.5.5 0 0 1-.48-.036a.5.5 0 0 1-.224-.346l-.007-3.877a.502.502 0 0 1 1.004 0v3.008l2.572-1.211a.501.501 0 1 1 .428.906"
                  />
                  <path
                    fill="currentColor"
                    d="M55.327.673H8.756C4.192.673.48 4.385.48 8.951v46.566c0 4.565 3.713 8.279 8.276 8.279h46.571c4.564 0 8.276-3.714 8.276-8.279V8.951c0-4.565-3.712-8.278-8.276-8.278M34.765 8.872a4.726 4.726 0 0 1 4.726 4.728c0 2.611-1.664 4.728-4.726 4.728a4.728 4.728 0 1 1 0-9.456M22.557 30.895l2.423-7.16c.648-1.779 2.279-3.873 4.73-3.873h10.108c2.451 0 4.083 2.094 4.73 3.873l2.423 7.16c.233.796-.019 1.659-.704 2.145c-.321.228-.752.38-1.118.38c-.43 0-.861-.146-1.164-.359l-6.524-4.583a1.754 1.754 0 0 1 2.022-2.866l3.819 2.886c.228.17.55.123.723-.104a.57.57 0 0 0-.104-.721l-3.026-2.276v-4.308l-6.129.998l-6.129-.998v4.308l-3.027 2.276a.574.574 0 0 0-.103.721a.516.516 0 0 0 .721.104l3.82-2.886a1.754 1.754 0 0 1 2.022 2.866l-6.524 4.583a2.1 2.1 0 0 1-1.166.359c-.365 0-.797-.153-1.116-.38c-.686-.486-.939-1.35-.706-2.145zm20.234 2.584L29.77 31.337l1.868-1.33l3.127.433l3.123-.433zM7.233 14.096c0-3.68 2.992-6.673 6.67-6.673s6.673 2.993 6.673 6.673s-2.995 6.671-6.673 6.671a6.68 6.68 0 0 1-6.67-6.671M34.707 51.06H19.342a1.5 1.5 0 0 1-1.497-1.498v-13.46c0-.824.669-1.495 1.497-1.495h2.995c.825 0 1.497.671 1.497 1.495v7.476h10.874zm6.397 3.404a2.58 2.58 0 0 1-2.581 2.579a2.58 2.58 0 0 1-2.582-2.579V43.039a2.583 2.583 0 0 1 5.163 0zm-1.089-14.722l-11.273-1.858a2.582 2.582 0 0 1 .839-5.094l11.273 1.859a2.577 2.577 0 0 1 2.127 2.964a2.584 2.584 0 0 1-2.966 2.128zm11.739 9.82a1.5 1.5 0 0 1-1.497 1.498h-7.915v-7.482h3.423v-7.476c0-.824.672-1.495 1.495-1.495h2.997c.824 0 1.497.671 1.497 1.495z"
                  />
                </svg>
              </div>
              <div>Liste d'attent</div>
            </router-link>

            <router-link to="/suivie" class="check-sidebar">
              <div>
                <svg
                  class="mx-4 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="currentColor"
                    d="M1397 1550q-21-114-78-210t-141-166t-189-110t-221-40q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-117 35-229t101-207t157-169t203-113q-56-36-100-83t-76-103t-47-119t-17-129q0-106 40-199t109-163T568 40T768 0t199 40t163 109t110 163t40 200q0 66-16 129t-48 119t-75 103t-101 83q99 38 183 100t147 143t105 177t54 202l-57 58zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1645 941l-557 558l-269-270l90-90l179 178l467-466z"
                  />
                </svg>
              </div>
              <div>Suivies</div>
            </router-link>

            <router-link to="/client" class="check-sidebar">
              <div>
                <img
                  src="../../assets/vue.svg"
                  alt=""
                  class="mx-3 w-[20px] h-[20px] fill-current"
                  fill="current-color"
                />
              </div>
              <div>client</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- main -->
    <div class="w-full h-full bg-pink-400">
      <div
        class="h-[50px] bg-[#68465f] flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 justify-between"
      >
        <!-- main sidebare -->
        <div class="cursor-pointer w-[30px]" @click="toggleSidebar">
          <svg
            class="w-7 h-7 text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </div>

        <!-- compte admin -->
        <div>
          <h1
            class="text-[20px] font-extrabold text-white px-5 py-2 rounded-md bg-[#805574]"
          >
            {{ this.infoAdmin.email }}
          </h1>
        </div>

        <!-- notification/logout -->
        <div class="flex justify-center items-center">
          <!-- notification -->
          <button>
            <div class="">
              <svg
                class="text-white w-6 h-5 mr-5"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 0-7 7v3.528a1 1 0 0 1-.105.447l-1.717 3.433A1.1 1.1 0 0 0 4.162 18h15.676a1.1 1.1 0 0 0 .984-1.592l-1.716-3.433a1 1 0 0 1-.106-.447V9a7 7 0 0 0-7-7m0 19a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 21"
                  />
                </g>
              </svg>
            </div>
          </button>

          <!-- logout -->
          <button @click="logout">
            <div class="flex items-center justify-center">
              <svg
                class="text-white mx-2"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 14 14"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M0 1.5A1.5 1.5 0 0 1 1.5 0h7A1.5 1.5 0 0 1 10 1.5v1.939a2 2 0 0 0-.734 1.311H5.75a2.25 2.25 0 1 0 0 4.5h3.516A2 2 0 0 0 10 10.561V12.5A1.5 1.5 0 0 1 8.5 14h-7A1.5 1.5 0 0 1 0 12.5zm10.963 2.807A.75.75 0 0 0 10.5 5v1H5.75a1 1 0 0 0 0 2h4.75v1a.75.75 0 0 0 1.28.53l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-.817-.163"
                  clip-rule="evenodd"
                />
              </svg>
              <h1 class="text-white">Logout</h1>
            </div>
          </button>
        </div>
      </div>

      <div class="h-[calc(100vh-50px)] bg-gray-200 p-[10px]">
        <div class="border border-pink-300 rounded-md p-[20px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <!-- <the-header></the-header>
    <the-sidebar></the-sidebar>
    <the-layout></the-layout> -->
  </div>
</template>

<script>
/* import TheHeader from "../TheHeader.vue";
import TheSidebar from "../TheSidebar.vue";
import TheLayout from "../TheLayout.vue";
export default {
  components: {
    TheHeader,
    TheSidebar,
    TheLayout,
  },
}; */

import { useAuthToken, useAppStore } from "../../stores";
export default {
  data() {
    return {
      sidebarOpen: true,
      infoAdmin: [],
    };
  },
  setup() {
    const authAdmin = useAuthToken();
    console.log(authAdmin);

    return { authAdmin };
  },

  mounted() {
    const store = useAppStore();
    this.infoAdmin = store.liste[0];
    /* console.log("==========", this.infoAdmin); */
  },

  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    logout() {
      const delToken = useAuthToken();
      const delAdmin = useAppStore();

      delToken.setToken("");
      delAdmin.getListe("");

      localStorage.removeItem("token");
      localStorage.removeItem("liste");

      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss"></style>
