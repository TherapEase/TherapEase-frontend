<template>
  <NavBarVue />

<div v-if="user.ruolo == 2 || user.ruolo == 1">
  <div class="contenitore">
    <div class="row">
      <div class="col-sm-6">
        <div class="col">
          <div class="stacca card mb-4">
            <div class="card-header">
              <h1>
                <strong>Ciao, {{ user.nome }}</strong>
              </h1>
            </div>
            <div class="card-body">
              Bentornato su TherapEase!
              <br />

              <router-link to="/prenotaseduta"
                ><button
                  v-if="user.ruolo == 1"
                  class="two btn btn-outline-dark size btn-sm"
                >
                  Prenota seduta
                </button></router-link
              >

              <br />

              <router-link to="/diario">
                <button
                  v-if="user.ruolo == 1"
                  class="btn btn-outline-dark size btn-sm"
                >
                  Diario
                </button></router-link
              >

              <br />

              <router-link to="/prenotaseduta"
                ><button
                  v-if="user.ruolo == 2"
                  class="btn tera btn-outline-dark size btn-sm"
                >
                  Visualizza slot
                </button></router-link
              >

              <br />

              <router-link to="/calendario"
                ><button class="btn tera btn-outline-dark size btn-sm">
                  Calendario
                </button></router-link
              >
              <br />

              <router-link to="/nuovaseduta"
                ><button
                  class="btn tera size btn-outline-dark btn-sm"
                  v-if="user.ruolo == 2"
                >
                  Inserisci seduta
                </button></router-link
              >
              <br />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4">
            <div v-if="user.ruolo == 2" class="card-header">
              <h1><strong>I tuoi clienti</strong></h1>
            </div>
            <CardAssociati
              class="associati"
              profile="dashboard"
              :ruolo="user.ruolo"
            ></CardAssociati>
            <ClientiAssociati
              style="width: 90%; margin: auto auto"
              v-if="user.ruolo == 2"
            ></ClientiAssociati>
          </div>
        </div>

        <gettoni-view></gettoni-view>
      </div>

      <div class="col-sm-6">
        <div class="col">
          <div class="stacca card mb-4">
            <div class="card-header">
              <h1>
                <strong>Le tue prossime sedute</strong>
              </h1>
            </div>
            <div class="card-body">
              <div class="sedute">
                <SedutePrenotate
                  :ruolo="user.ruolo"
                  class="prenotate"
                ></SedutePrenotate>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div v-if="user.ruolo == 1">
            <div class="card mb-4">
              <div class="card-header">
                <h1>
                  <strong> Il tuo diario terapeutico</strong>
                </h1>
              </div>
              <div class="card-body">
                <diario-terapeutico style="width: 90%"></diario-terapeutico>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import CardAssociati from "@/components/CardAssociati.vue";
import DiarioTerapeutico from "@/components/DiarioTerapeutico.vue";
import ClientiAssociati from "@/components/ClientiAssociati.vue";
import GettoniView from "@/components/GettoniView.vue";

export default defineComponent({
  components: {
    NavBarVue,
    SedutePrenotate,
    CardAssociati,
    DiarioTerapeutico,
    ClientiAssociati,
    GettoniView,
  },
  //components: { SedutePrenotate, NavBarVue },
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
        "x-access-token": token
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

.associati {
  width: 500px;
  margin-top: 20px;
}

.diario {
  margin: auto auto;
}
.grassetto {
  font-size: 40px;
  color: rgb(37, 66, 37);
  font-family: Tahoma;
  font-weight: bold;
}
.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
  font-weight: bold;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
  margin-left: 10px;
  margin-right: 10px;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body {
  font-family: Tahoma;
}
.text-primary {
  color: #4650dd !important;
}
h3 {
  font-size: small;
}
h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

.lead {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7875rem;
}

.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);

  flex-wrap: wrap;
}
a {
  color: #4650dd;
  text-decoration: underline;
  cursor: pointer;
}
.card-profile-img {
  position: center;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img,
svg {
  vertical-align: middle;
}
.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}
.col-lg-8 {
  margin-top: 1em;
}
.form-control {
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}
.contentDiv {
  padding-top: 4rem;
}
.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;

  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}

.clienti-associati {
  font-size: 40px;
  color: rgb(37, 66, 37);
  font-family: Tahoma;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.stacca {
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 1em;
}

.grassetto {
  font-size: 40px;
  color: rgb(37, 66, 37);
  font-family: Tahoma;
  font-weight: bold;
}
.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
  font-weight: bold;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body {
  font-family: Tahoma;
}
.text-primary {
  color: #4650dd !important;
}
h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

.lead {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7875rem;
}

.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);

  flex-wrap: wrap;
}
a {
  color: #4650dd;
  text-decoration: underline;
  cursor: pointer;
}
.card-profile-img {
  position: relative;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img,
svg {
  vertical-align: middle;
}
.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}
.form-control {
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}
.contentDiv {
  padding-top: 4rem;
}
.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}

.size {
  width: 90%;
  height: 50px;
}

.two {
  margin-bottom: 20px;
}

.contenitore {
  width: 98%;
}
.tera {
  margin-bottom: 10px;
}
</style>
 