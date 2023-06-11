import { createStore } from 'vuex'
// import {ICliente} from '@/models/ICliente'


export default createStore({
  state: {
    token: "",
    user: {
      username: "",
      ruolo: "",
      nome: "",
      cognome: "",
      email: "",
      cf: "",
      foto_profilo: "",
      data_nascita: "",
      n_gettoni: "",
      associato: "",
      sede: "",

    }
  },

  getters: {
    // returnToken(state, getters) {
    //   return this.state.token
    // },
    // returnUser(state, getters) {
    //   if(getters.user == null) {
    //     return {}
    //   }
    //   return this.state.user
    // }
  },
  mutations: {
    setState(state, payload) {
      state.token = payload.token;
      state.user = payload.user;


      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('user', payload.user)
    },

    removeState(){
      // state.token="";
      // state.user="";
      console.log()
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
    }
    
  },


  actions: {
  },
  modules: {
  }
})