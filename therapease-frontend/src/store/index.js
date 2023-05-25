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
      console.log(`SIAMO NELLO STORE`)

      state.token = payload.token;
      console.log(`state token `+state.token)

      state.user = payload.user;
      console.log(`state token `+ state.user)


      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('user', payload.user)
      // TODO: richiedere se rimanere loggati
      // localStorage.setItem('token', payload.token)
      // localStorage.setItem('user', JSON.stringify(payload.user))
      console.log(`PAYLOD TOKEN : ${payload.token} `)
    },

    removeState(state){
      // state.token="";
      // state.user="";
  
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      console.log("token nell'index: "+ state.token)
    }
    
  },


  actions: {
  },
  modules: {
  }
})
