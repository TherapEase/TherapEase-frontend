<template>
  <div>
    <div>
      <div>
        <NavBarVue />
      </div>
      <div class="contenitore">

      <div class="row">
        <div class="col-lg-4">
          <div class="stacca card card-profile mb-4">
            <div class="card-header" style="background-image"></div>
            <div class="card-body text-center">
              <img
                class="card-profile-img"
                src="../assets/profilePic.webp"
                alt="foto profilo"
              />
              <h4 class="mb-3">
                <strong>{{ user.nome }} {{ user.cognome }}</strong>
              </h4>
              <router-link to="/modifica">
                <button class="btn btn-outline-dark btn-sm">
                  Modifica
                </button></router-link
              >
              <input
                class="btn btn-outline-dark btn-sm"
                value="Logout"
                type="submit"
                @click.stop="logout"
              />

              <input
                class="btn btn-outline-dark btn-sm"
                value="Elimina"
                type="submit"
                @click.stop="elimina"
              />
            </div>
          </div>
          <!-- inizio card terapeuta associato -->
          <CardAssociati class=" stacca associati" :ruolo="user.ruolo"></CardAssociati>

          <!-- fine card terapeuta associato -->
        </div>
        <div class="col-sm-6">
          <div class="card overflow-hidden mb-4">
            <div class="card-header">
              <h4 class="grassetto">Il mio profilo</h4>
              <div class="informazioni">
                <h5><strong>Username:</strong> {{ this.user.username }}</h5>
                <h5><strong>Nome:</strong> {{ this.user.nome }}</h5>
                <h5><strong>Cognome:</strong> {{ user.cognome }}</h5>
                <h5>
                  <strong>Data Di Nascita:</strong> {{ user.data_nascita }}
                </h5>
                <h5><strong>Email:</strong> {{ user.email }}</h5>
                <h5><strong>Codice Fiscale:</strong> {{ user.cf }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">

        <div class=" col-sm-4">
          <!-- inizio card clienti associati -->

          <div v-if="user.ruolo == 2" class="stacca card mb-4">
            <h3 class="clienti-associati">
              <strong> Clienti Associati</strong>
            </h3>
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <img
                    class="avatar avatar-lg p-1"
                    src="../assets/profilePic.webp"
                    alt="foto profilo"
                  />
                </div>
                <div class="flex-grow-1 ps-3">
                  <h4>Tizietto Caietto</h4>
                  <button class="btn btn-outline-dark btn-sm" >
                    Visita Profilo
                  </button>
                </div>
              </div>
            </div>
          </div>
         fine card clienti associati -->
        </div>
      </div>

      <div class="row">
          <!-- inizio card gettoni cliente -->
          <div class="  col-sm-4">
          <GettoniView class="stacca"></GettoniView></div>
          <!-- fine card gettoni cliente -->
      </div>
      </div>
    </div>
  </div>
</template>

<script>
//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";
import CardAssociati from "@/components/CardAssociati.vue";
import GettoniView from "@/components/GettoniView.vue";

export default defineComponent({
  components: { NavBarVue, CardAssociati, GettoniView },
  name: "ProfileView",
  props: {
    msg: String,
  },

  data() {
    return {
      user: {},
      ass:{}, 
      isAssociato:false,
    };
  },
  methods: {
    async logout() {
      console.log("sei dentro il logout");
      const token = sessionStorage.getItem("token");
      console.log("token al momento del logout: " + token);
      const opzioniRichiesta = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/logout`,
          opzioniRichiesta
        );
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        console.log(data);
        if (data.successful) {
          await this.$store.commit("removeState");
          console.log("get item" + sessionStorage.getItem("user"));
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async elimina(){
      const token = sessionStorage.getItem("token")
      const opzioniRichiesta={
        method: 'DELETE',
        headers:{
          "Content-Type":"application/json",
          "x-access-token": token
        }
      }

      try {
        const res = await fetch(`${process.env.VUE_APP_ROOT_API}/il_mio_profilo/elimina`,opzioniRichiesta)
        const data = await res.json()
        if(data.successful){
          this.$router.push("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
    

  },

  async mounted() {
    const token = sessionStorage.getItem("token");

    const opzioniRichiesta = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
        opzioniRichiesta
      );

      const informazioni = await response.json();
      console.log(informazioni);
      console.log(
        "utente: " + JSON.stringify(informazioni["profile"]["ruolo"])
      );
      this.user = informazioni["profile"];
      console.log(this.user._id);
      this.user.data_nascita = this.user.data_nascita.slice(0, 10);
      if(this.user.associato != ""){
        this.isAssociato=true
      }





    } catch (error) {
      console.log(error);
    }



   //info terapeuti

   
    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/profilo/${this.user.associato}`,
        opzioniRichiesta
      );

      console.log("terapeuta associato: "+this.user.associato)

      const dati = await response.json();
      console.log(JSON.stringify(dati));

      console.log("stampa del profilooooo");
      console.log(dati["successful"]);
      
      this.ass=dati["profilo"];
      console.log(this.ass)
    } catch (error) {
      console.log(error);
    }


    //   const res = await fetch(
    //     `http://localhost:3001/api/v1/il_mio_profilo`,
    //     opzioniRichiesta
    //   );
    //   const data = await res.json();
    //   console.log(data.successful);

    //   console;
    //   //const utente = JSON.parse(atob(data.token.split(".")[1]));
    //   // console.log("utente: " + utente.username);
    //   console.log("utente: " + store.getters.returnUser);
    // },
    // data() {
    //   return {
    //     user: store.getters.returnUser,
    //     error: {
    //       status: false,
    //       messaggio: "Messaggio di default.",
    //     },
    //   };

  },
});
</script>

<style scoped>
.contenitore{
  width: 99%;
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
</style>
 