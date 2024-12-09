import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '../components/Home/TheHome.vue'
import about from '../components/Home/HomeInterface.vue'
import post from '../components/Propos/ProposInterface.vue'
import liste_d_attente from '../components/Listeattent/ListeAttenteInterface.vue';
import suivie from '../components/Suivi/SuiviInterface.vue'
import  client from '../components/Client/ClientInterface.vue'
import Singin from '../components/Authentification/Singin.vue'
import Login from '../components/Authentification/Login.vue'
import { useAuthToken } from '../stores/index.js';

function isAuthentication(){
  const authStore = useAuthToken();
  return !!authStore.token;
}

const routes = [
  { 
    path: '/home', 
    component: TheHome,
    meta : { requiresAuth : true },
    children: [
      {
        path: '/about',
        component : about
      },
      {
        path: '/propos',
        component : post
      },
      {
        path: '/liste_d_attente',
        component : liste_d_attente
      },
      {
        path: '/suivie',
        component : suivie
      },
      {
        path: '/showOneDataClient/:id',
        component: () => import('../components/Suivi/DataClientSuivi.vue') 
      },
      {
        path: '/updateSuivi/:id',
        component: () => import('../components/Suivi/UpdateSuivi.vue') 
      },
      {
        path: '/client',
        component : client,
        children : [
          {
            path: '/client/:id/insertClient',
            component: () => import('../components/Client/InsertClient.vue') 
          },   
          {
            path: '/client',
            component: () => import('../components/Client/ListPost.vue') 
          },       
        ]
      },  
     ],
  },
  {
    path: '/signin',
    component : Singin,
  },
  {
    path:'/',
    component : Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next )=>{
  if(to.meta.requiresAuth && !isAuthentication()){
    next('/')
  }else{
    next()
  }
})

export default router



/* import { createRouter, createWebHistory } from 'vue-router'
import TheHome from '../components/Home/TheHome.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: TheHome 
        }
        children: 
        [{
            path: '/about',
            component: () => import('../components/About/TheAbout.vue')
        }
        ]
    ]
})

path: '/', 
    component: TheHome,
     children: [
      {
        path: '/about',  
        component: () => import('../components/Home/HomeInterface.vue') 
      },
      {suivie
        path: '/propos',
        component: () => import('../components/Propos/ProposInterface.vue') 
      },
      {
        path: '/liste_d_attente',
        component: () => import('../components/Listeattent/ListeAttenteInterface.vue') 
      },
      {
        path: '/Suivi',
        component: () => import('../components/Suivi/SuiviInterface.vue') 
      },
      {
        path: '/showOneDataClient/:id',
        component: () => import('../components/Suivi/DataClientSuivi.vue') 
      },
      {
        path: '/updateSuivi/:id',
        component: () => import('../components/Suivi/UpdateSuivi.vue') 
      },

      {
        path: '/client',
        component: () => import('../components/Client/ClientInterface.vue'), 
        children : [
          {
            path: '/client/:id/insertClient',
            component: () => import('../components/Client/InsertClient.vue') 
          },   
          {
            path: '/client',
            component: () => import('../components/Client/ListPost.vue') 
          },       
        ]
      },
    ]

export default router */