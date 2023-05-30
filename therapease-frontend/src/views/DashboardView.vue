<template>
  <NavBarVue />

  <h1>
    <strong>Ciao, {{ user.nome }}</strong>
  </h1>
  <router-link to="/nuovaseduta"
    ><button class="btn sfondo btn-outline-dark btn-sm" v-if="user.ruolo == 2">
      Inserisci seduta
    </button></router-link
  >
  <router-link to="/prenotaseduta"
    ><button v-if="user.ruolo == 1" class="btn sfondo btn-outline-dark btn-sm">
      Prenota seduta
    </button></router-link
  >

  <router-link to="/prenotaseduta"
    ><button v-if="user.ruolo == 2" class="btn sfondo btn-outline-dark btn-sm">
      Visualizza slot
    </button></router-link
  >
  <router-link to="/calendario"
    ><button class="btn sfondo btn-outline-dark btn-sm">
      Calendario
    </button></router-link
  >
  <CardAssociati class="associati" :ruolo="user.ruolo"></CardAssociati>

  <div class="sedute">
    <SedutePrenotate :ruolo="user.ruolo" class="prenotate"></SedutePrenotate>
  </div>
  <div class="diario">

  <CardDiario class="card" ></CardDiario></div>
</template>

<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";
import SedutePrenotate from "@/components/SedutePrenotate.vue";
import CardAssociati from "@/components/CardAssociati.vue";
import CardDiario from "@/components/CardDiario.vue";

export default defineComponent({
  components: { NavBarVue, SedutePrenotate, CardAssociati, CardDiario },
  data() {
    return {
      user: {},
      userRuolo: 1,
    };
  },
  async mounted() {

    
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await fetch(
      `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
      options
    );
    const dati = await response.json();
    console.log(JSON.stringify(dati));
    this.user = dati["profile"];
    this.userRuolo = this.user.ruolo;
  },
});
</script>


<style  scoped>
.sfondo {
  background-color: white;
  margin-left: 10px;
}
.calendario {
  width: 500px;
  height: 500px;
  background-color: white;
  color: black;
}

.associati{
  width: 500px;
  margin-top: 20px ;
}

.diario{
  margin:auto auto;
}

</style>