import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LoginView from "../views/LoginView.vue";
import RegistrationView from "../views/RegistrationView.vue"
import ProfileView from "../views/ProfileView.vue"
import InfoView from "../views/InfoView.vue"
import CatalogoView from "../views/CatalogoView.vue"
import ChiSiamoView from "../views/ChisiamoView.vue"
import SupportoTecnicoView from "../views/SupportoView.vue"
import OffertaView from "../views/OffertaView.vue"
import TerapeutaprofiloView from "../views/TerapeutaprofiloView.vue"
import TerapeutaperutenteView from "../views/TerapeutaperutenteView.vue"
import ModificaView from "../views/ModificaView.vue"
import ModificaprofiloterapeutaView from "../views/ModificaprofiloterapeutaView.vue"
import DashboardView from "../views/DashboardView.vue"
import ChangepasswordView from "../views/ChangepasswordView.vue"

const routes = [
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
  }, {
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
  {
    path: '/profiloterapeuta',
    name: 'profiloterapeuta',
    component: TerapeutaprofiloView
  },
  {
    path: '/terapeutaperutente',
    name: 'terapeutaperutente',
    component: TerapeutaperutenteView
  },
  {
    path: '/modifica',
    name: 'modifica',
    component: ModificaView
  },
  {
    path: '/modificaterapeuta',
    name: 'modificaterapeuta',
    component: ModificaprofiloterapeutaView
  }, 
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: ChangepasswordView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/login', '/registrazione', '/chisiamo', '/catalogo', '/offerta'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');
  console.log(loggedIn)


  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})


export default router