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
      associato: ""
    }
  },

  getters: {
    returnToken(state, getters) {
      console.log(`TOKEN GETTER: ${getters.token}`)
      return this.state.token
    },
    returnUser(state, getters) {
      console.log(`USER GETTER: ${getters.user}`)
      if(getters.user == null) {
        return {}
      }
      return this.state.user
    }
  },
  mutations: {
    setState(state, payload) {
      state.token = payload.token;
      state.user = payload.user;

      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('user', JSON.stringify(payload.user))
      // TODO: richiedere se rimanere loggati
      // localStorage.setItem('token', payload.token)
      // localStorage.setItem('user', JSON.stringify(payload.user))
      console.log(`PAYLOD TOKEN : ${payload.token} `)
    },
    
  },
  actions: {
  },
  modules: {
  }
})
