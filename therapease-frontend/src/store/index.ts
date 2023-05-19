import type { ICliente } from '@/models/ICliente';
import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  token: string,
  user: ICliente
};

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    token: "",
    user: {}
  },
  mutations: {
    setState(state, payload: {user: {}, token: ""}) {
      state.token = payload.token;
      state.user = payload.user;

      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('user', JSON.stringify(payload.user))
      // TODO: richiedere se rimanere loggati
      // localStorage.setItem('token', payload.token)
      // localStorage.setItem('user', JSON.stringify(payload.user))
      console.log(`PAYLOD TOKEN : ${payload.token} `)
    },
    recoverState(state) {
      // if (localStorage.getItem('token') != null) {
      //   state.token = localStorage.getItem('token')!
      //   state.user = JSON.parse(localStorage.getItem('user')!)
      // }
      if (sessionStorage.getItem('token') != null) {
        state.token = sessionStorage.getItem('token')!
        state.user = JSON.parse(sessionStorage.getItem('user')!)
      }
    }
  },
  getters: {
    returnToken(state, getters) {
      console.log(`TOKEN IN GETTER: ${getters.token}`);
      return this.state.token;
    },
    returnUser(state, getters){
      if(getters.user == null) {
        return {}
      }
      return getters.user;
    }
  }
});

export default store;
