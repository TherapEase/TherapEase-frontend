<template>
  <NavBarVue />
<div v-if="user.ruolo == 2 || user.ruolo == 1">
  <h1>
    <strong>Ciao, {{ user.name }}</strong>
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
  <div class="sedute">
    <SedutePrenotate :ruolo="user.ruolo" class="prenotate"></SedutePrenotate>
  </div>
</div>

<div v-if="user.ruolo == 4">
  
  <div class="job-list">
    <h4>Terapeuti:</h4>
    <router-link to="/catalogo">
      <button class="rimozione_forzata"> Visualizza</button>
    </router-link>

  </div>

  <div class="job-list">
    <h4>Clilenti: </h4>   
    <router-link to="/clienti">
      <button class="rimozione_forzata"> Visualizza</button>
    </router-link>
  </div>

  <div class="job-list">
    <h4>Segnalazioni: </h4>   
    <router-link to="/segnalazioni">
      <button class="rimozione_forzata"> Visualizza</button>
    </router-link>
  </div>




</div>


</template>

<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";
import SedutePrenotate from "@/components/SedutePrenotate.vue";

export default defineComponent({
  components: { NavBarVue, SedutePrenotate },
  data() {
    return {
      user: {},
      userRuolo: 1,
      terapeuti: [],
      clienti: [],
      segnalazioni: []
    };
  },
  async mounted() {

    
    const token = sessionStorage.getItem("token");



    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
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
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log(response["successful"])

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const informazioni = await response.json()
      console.log(informazioni)
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
          headers: { "Content-Type": "application/json" }
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
            "token":token
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

  async gestisci_segnalazione(){
    const token=sessionStorage.getItem("token");

    const options={
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
    };
    const param = this.$route.params.id
    const res = await fetch(`${process.env.VUE_APP_ROOT_API}/segnalazione/gestisci/${param}`, options)
    const i = await res.json()
    console.log(i.successful)
    console.log("gestita: "+JSON.stringify(i))
  }
});
</script>


<style  scoped>
.riga {
  display: flex;
  flex-direction: row;
}

img {
  margin-right: 30px;
  margin-left: 30px;
}

.colonna {
  display: flex;
  flex-direction: column;
}

button {
  width: 130px;
}

h1 {
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.job-list {
  max-width: 960px;
  margin: 40px auto;
}

.job-list ul {
  padding: 0;
}

.job-list li {
  list-style-type: none;
  background: white;
  padding: 16px;
  margin: 16px 0;
  border-radius: 1em;
}

.job-list h2 {
  margin: 0 0 10px;
  text-transform: capitalize;
  font-weight: bold;
}

.job-list h4 {
  margin: 0 0 10px;
  text-transform: capitalize;
  font-weight: bold;
}


.list-move {
  transition: all 1s;
}

.rimozione_forzata{
  background-color:#2b3a24;
  color:white;
  border-radius: 0.5em;
  border-color: black;
}
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
</style>