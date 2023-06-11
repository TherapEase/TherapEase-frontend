<template>
  <div>
    <NavBarVue />
  </div>
  <div class="contenitore">
    <div class="row">
      <div class="col-sm-6">
        <div class="col">
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
                <button v-if="user.ruolo==1 || user.ruolo==1" class="btn btn-outline-dark btn-sm">
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
                @click.stop="alertElimina"
              />
            </div>
          </div>

          <div v-if="user.ruolo == 1" class="stacca card mb-4">
            <CardAssociati
              class="associati"
              :ruolo="user.ruolo"
            ></CardAssociati>
          </div>
          <!-- <div class="col-sm-6"> -->
          <div v-if="user.ruolo == 2" class="stacca card mb-4">
            <h3 class="clienti-associati">
              <strong> Clienti Associati</strong>
            </h3>
            <div class="card-body">
              <div class="d-flex align-items-center">
                <ClientiAssociati style="width: 90%"></ClientiAssociati>
              </div>
            </div>
          </div>
          <!-- </div> -->

          <GettoniView class="stacca"></GettoniView>
        </div>
     
      </div>

      <div class="col-sm-6" v-if="user.ruolo==1 || user.ruolo==2">
        <div class="col">
          <div class="card stacca mb-4">
            <div class="card-header">
              <h4 class="grassetto">Il mio profilo personale</h4>
            </div>

            <div class="informazioni card-body">
              <h5><strong>Username:</strong> {{ this.user.username }}</h5>
              <h5><strong>Nome:</strong> {{ this.user.nome }}</h5>
              <h5><strong>Cognome:</strong> {{ user.cognome }}</h5>
              <h5><strong>Data Di Nascita:</strong> {{ user.data_nascita }}</h5>
              <h5><strong>Email:</strong> {{ user.email }}</h5>
              <h5><strong>Codice Fiscale:</strong> {{ user.cf }}</h5>
            </div>
          </div>
        </div>
        <div v-if="user.ruolo == 2" class="stacca card mb-4">
          <div class="card-header">
            <h4 class="grassetto">Le mie recensioni</h4>
          </div>

          <div class="card-body">
            <CardRecensioni></CardRecensioni>
          </div>
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
import ClientiAssociati from "@/components/ClientiAssociati.vue";
import CardRecensioni from "@/components/CardRecensioni.vue";

import Swal from "sweetalert2";

export default defineComponent({
  components: {
    NavBarVue,
    CardAssociati,
    GettoniView,
    ClientiAssociati,
    CardRecensioni,
  },

  name: "ProfileView",
  props: {
    msg: String,
  },

  data() {
    return {
      user: {},
      ass: {},
      // clienti_associati:[],
      isAssociato: false,
    };
  },
  methods: {
    async logout() {
      const token = sessionStorage.getItem("token");
      const opzioniRichiesta = {
        method: "DELETE",
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
        
        const data = await res.json();
        if (data.successful) {
          await this.$store.commit("removeState");
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },

    alertElimina() {
      Swal.fire({
        title: "Sei sicuro di voler procere?",
        text: `Se clicchi su "continua" il tuo account verrà eliminato`,
        showCancelButton: true,
        confirmButtonText: "Continua",
        cancelButtonText: "Cancella",
        confirmButtonColor: "#5b6c53",
        customClass: {
          confirmButton: "conferma",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.elimina();
        }
      });
    },

    async elimina() {
      const token = sessionStorage.getItem("token");
      const opzioniRichiesta = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/il_mio_profilo/elimina`,
          opzioniRichiesta
        );
        const data = await res.json();
        if (data.successful) {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
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
      this.user = informazioni["profile"];
      this.user.data_nascita = this.user.data_nascita.slice(0, 10);
      if (this.user.associato != "") {
        this.isAssociato = true;
      }
    } catch (error) {
      console.log(error);
    }

    //info terapeuti
    if (this.user.ruolo) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/profilo/${this.user.associato}`,
          opzioniRichiesta
        );
        const dati = await response.json();
        this.ass = dati["profile"];
      } catch (error) {
        console.log(error);
      }
    }

    //get info clienti

    try {
      //probabilmente la fetch cambierà
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_associati`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const dati = await response.json();
      this.clienti_associati = dati["catalogo"];
    } catch (error) {
      console.log(error);
    }
  },
});
</script>

<style scoped>
.contenitore {
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
 