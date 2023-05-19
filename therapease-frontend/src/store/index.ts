import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      token: null,
      user: {}
    }
  },
  mutations: {
    setLogin(state, payload) {
      state.token = payload.token
      state.user = payload.user

      console.log("è dentrooooo siuuuum")


      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('user', JSON.stringify(payload.user))
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))

    },
  }
})

export default store