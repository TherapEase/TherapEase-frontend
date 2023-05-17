import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      token: "",
      user: {
        username: "",
        password: "",
      },

    }
  },
  mutations: {
    setLogin(state, payload) {
      state.token = payload.token
      state.user = payload.user
      
      sessionStorage.setItem('token', payload.token)
      sessionStorage.setItem('user', JSON.stringify(payload.user))


    }

  }
})

// Install the store instance as a plugin

export default store
  // Install the store instance as a plugin
