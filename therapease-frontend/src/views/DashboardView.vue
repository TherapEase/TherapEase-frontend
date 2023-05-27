<template>
  <NavBarVue />

  <h1><strong>Benvenuto</strong></h1>
  <router-link to="/nuovaseduta"><button v-if="user.ruolo==2">Inserisci seduta</button></router-link>
</template>

<script>
import { defineComponent } from "vue"
import NavBarVue from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBarVue },
  data() {
    return {
      user:{}
    }

  },
  async mounted(){
    const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await fetch(
        "http://localhost:3001/api/v1/il_mio_profilo",
        options
      );
      const dati = await response.json();
      console.log(JSON.stringify(dati));
      this.user = dati["profile"];
  }
})
</script>


<style  scoped></style>