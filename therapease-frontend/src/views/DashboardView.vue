<template>
  <NavBarVue />
  <div v-if="user.ruolo == 2 || user.ruolo == 1">
    <h1>
      <strong>Ciao, {{ user.nome }}</strong>
    </h1>
    <router-link to="/nuovaseduta"
      ><button
        class="btn sfondo btn-outline-dark btn-sm"
        v-if="user.ruolo == 2"
      >
        Inserisci seduta
      </button></router-link
    >
    <router-link to="/prenotaseduta"
      ><button
        v-if="user.ruolo == 1"
        class="btn sfondo btn-outline-dark btn-sm"
      >
        Prenota seduta
      </button></router-link
    >

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


  <router-link to="/diario"> <button>Diario</button></router-link>


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
      terapeuti: [],
      clienti: [],
      segnalazioni: [],
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

    //catalogo terapeuti

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_terapeuti`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response["successful"]);

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const informazioni = await response.json();
      console.log(informazioni);
      console.log("catalogo: " + JSON.stringify(informazioni["catalogo"]));

      this.terapeuti = informazioni["catalogo"];
      return this.terapeuti;
    } catch (error) {
      console.log(error);
    }

    //catalogo clienti

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_clienti`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response["successful"]);

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const data = await response.json();
      console.log(data);
      console.log("catalogo: " + JSON.stringify(data["catalogo"]));

      this.clienti = data["catalogo"];
      return this.clienti;
    } catch (error) {
      console.log(error);
    }

    //catalogo segnalazioni

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/segnalazione/catalogo_segnalazioni`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      console.log(response["successful"]);

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const info = await response.json();
      console.log(info);
      console.log("catalogo: " + JSON.stringify(info["catalogo"]));
      this.segnalazioni = info["catalogo"];
      return this.segnalazioni;
    } catch (error) {
      console.log(error);
    }
  },

  async gestisci_segnalazione() {
    const token = sessionStorage.getItem("token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const param = this.$route.params.id;
    const res = await fetch(
      `${process.env.VUE_APP_ROOT_API}/segnalazione/gestisci/${param}`,
      options
    );
    const i = await res.json();
    console.log(i.successful);
    console.log("gestita: " + JSON.stringify(i));
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