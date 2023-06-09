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
import TerapeutaperutenteView from "../views/TerapeutaperutenteView.vue"
import ModificaView from "../views/ModificaView.vue"
import DashboardView from "../views/DashboardView.vue"
import NuovasedutaView from  "../views/NuovasedutaView.vue"
import PrenotasedutaView from "../views/PrenotasedutaView.vue"
import CalendarioView from "../views/CalendarioView.vue"
import CatalogoclientiView from "../views/CatalogoclientiView.vue"
import CatalogosegnalazioniView from "../views/CatalogosegnalazioniView.vue"
import SegnalazioneView from "../views/SegnalazioneView.vue"
import RecensioneView from "../views/RecensioneView.vue"
import InserisciprodottoView from "../views/InserisciprodottoView.vue"
import CheckoutsuccView from "../views/CheckoutsuccView.vue"
import CheckoutfailView from "../views/CheckoutfailView.vue"

import PasswordRecoveryView from "../views/PasswordRecoveryView.vue"
import DiarioViewVue from '@/views/DiarioView.vue';


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
    path: '/profilo/:id',
    name: 'profiloId',
    component: TerapeutaperutenteView
  },
  {
    path: '/modifica',
    name: 'modifica',
    component: ModificaView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/nuovaseduta',
    name: 'nuovaseduta',
    component: NuovasedutaView
  },
  {
    path: '/prenotaseduta',
    name: 'prenotaseduta',
    component: PrenotasedutaView
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: CalendarioView
  },
  {
    path: '/clienti',
    name: 'clienti',
    component: CatalogoclientiView
  },
  {
    path: '/segnalazioni',
    name: 'segnalazioni',
    component: CatalogosegnalazioniView
  },
  {
    path: '/compila_segnalazione/:id',
    name: 'compila_segnalazione',
    component: SegnalazioneView
  },
  {

    path: '/recensisci',
    name: 'recensisci',
    component: RecensioneView
  },
  {
    path: '/recupero_password',
    name: 'recuperopassword',
    component: PasswordRecoveryView
   },
  {
    path: '/diario',
    name: 'diario',
    component: DiarioViewVue
  },
  {
    path: '/inserisci_prodotto',
    name: '/inserisci_prodotto',
    component: InserisciprodottoView
  },
  {
    path: '/checkout_succ/',
    name: '/checkout_succ',
    component: CheckoutsuccView
  },
  {
    path: '/checkout_fail/',
    name: '/checkout_fail',
    component: CheckoutfailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/login', '/registrazione', '/chisiamo', '/catalogo', '/offerta', '/recupero_password', '/info'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('user');


  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})


export default router