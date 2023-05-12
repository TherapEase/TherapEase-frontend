import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "../views/LoginView.vue";
import RegistrationView from "../views/RegistrationView.vue"
import ProfileView from "../views/ProfileView.vue"
import InfoView from "../views/InfoView.vue"
import CatalogoView from "../views/CatalogoView.vue"
import ChiSiamoView from "../views/ChisiamoView.vue"
import SupportoTecnicoView from "../views/SupportoView.vue"
import OffertaView from "../views/OffertaView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/registrazione',
      name: 'registrazione',
      component: RegistrationView
    },{
      path: '/profilo',
      name: 'profilo',
      component: ProfileView
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogoView
    },
    {
      path: '/chisiamo',
      name: 'chisiamo',
      component: ChiSiamoView
    },
    {
      path: '/supportotecnico',
      name: 'supportotecnico',
      component: SupportoTecnicoView
    },
    {
      path: '/offerta',
      name: 'offerta',
      component: OffertaView
    },

  ]
})

export default router
