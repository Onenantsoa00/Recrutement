// stores/index.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        liste: localStorage.getItem('liste') ? JSON.parse(localStorage.getItem('liste')) : [],
    }),
    actions: {
        getListe(payLoad = []) {
            this.liste = payLoad;
            localStorage.setItem('liste', JSON.stringify(this.liste));
        }
    },
    getters: {},
    mutations: {}
});

export const useAuthToken = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '', // Token should be a string
        infoAdmin:null
    }),
    actions: {
        setToken(payLoad) {
            this.token = payLoad;
            localStorage.setItem('token', this.token); // Storing token as a string
        },
        setAdminInfo(infoAdmin){
            this.infoAdmin = infoAdmin;
            localStorage.setItem('infoAdmin', JSON.stringify(infoAdmin));
        }
    },
    getters: {},
    mutations: {}
});
