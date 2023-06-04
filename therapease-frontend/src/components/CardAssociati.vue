<template>
  <div v-if="ruolo == 1 && isAssociato" class="card mb-4">
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
          <h4>
            <strong> Terapeuta Associato: </strong>
          </h4>
          <h5>{{ ass.nome }} {{ ass.cognome }}</h5>

          <router-link
            :to="{ name: 'profiloId', params: { id: `${ass._id}` } }"
          >
            <button v-if="isAssociato" class="btn btn-outline-dark btn-sm">
              Visita Profilo
            </button></router-link
          >
          <button @click="allertaDissocia" class="btn btn-outline-dark btn-sm">Dissocia</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CardAssociati",
  props: { ruolo: Number },
  data() {
    return {
      ass: {},
      isAssociato:false
    };
  },
  methods:{allertaDissocia() {
      Swal.fire({
        title: "Sei sicuro di voler procere?",
        text: `Se clicchi su "continua" non potrai più prenotare sedute con ${this.user.nome.toUpperCase()} ${this.user.cognome.toUpperCase()} `,
        showCancelButton: true,
        confirmButtonText: "Continua",
        cancelButtonText: "Cancella",
        confirmButtonColor: "#5b6c53",
        customClass: {
          confirmButton: "conferma",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.disassocia();
        }
      });
    },

    async disassocia() {
      console.log("associato: " + this.associato);
      console.log("ti stai disassociando");
      const token = sessionStorage.getItem("token");
      const opzioniRichiesta = {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      };
      const param = this.$route.params.id;

      try {
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/associazione/rimuovi/${param}`,
          opzioniRichiesta
        );
        const informazioni = await response.json();
        console.log(informazioni.successful);
        this.isAssociato = false;
        console.log("associazione dopo: " + this.associato);
      } catch (error) {
        console.log(error);
      }
    },},
  setup() {},
  async mounted() {
    const token = sessionStorage.getItem("token");

    const opzioniRichiesta = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };

    //loggeduser

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
      if (this.user.associato != "") {
        this.isAssociato = true;
      }
    } catch (err) {
      console.log(err);
    }

//associato

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
    } catch (err) {
      console.log(err);
    }
  },
});
</script>


<!-- <script>
import { defineComponent } from "vue"
import "bootstrap/dist/css/bootstrap.min.css";


export default defineComponent({
  name: "CardAssociati",
  props:{ruolo:Number},
  data() {
    return {
      user: {},
      ass: {},
      isAssociato: false,
    };
  },
  methods() {},
//   async mounted() {
//     const token = sessionStorage.getItem("token");

//     const opzioniRichiesta = {
//       method: "GET",
//       headers: {
//         "x-access-token": token,
//       },
//     };

//     //loggeduser

//     try {
//       const response = await fetch(
//         `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
//         opzioniRichiesta
//       );

//       const informazioni = await response.json();
//       console.log(informazioni);
//       console.log(
//         "utente: " + JSON.stringify(informazioni["profile"]["ruolo"])
//       );
//       this.user = informazioni["profile"];
//       console.log(this.user._id);
//       this.user.data_nascita = this.user.data_nascita.slice(0, 10);
//       if (this.user.associato != "") {
//         this.isAssociato = true;
//       }
//     } catch (err) {
//       console.log(err);
//     }

// //associato

//     try {
//       const response = await fetch(
//         `${process.env.VUE_APP_ROOT_API}/profilo/${this.user.associato}`,
//         opzioniRichiesta
//       );

//       console.log("terapeuta associato: "+this.user.associato)

//       const dati = await response.json();
//       console.log(JSON.stringify(dati));

//       console.log("stampa del profilooooo");
//       console.log(dati["successful"]);
      
//       this.ass=dati["profilo"];
//       console.log(this.ass)
//     } catch (err) {
//       console.log(err);
//     }
//   },
//
 });
</script> -->


<style scoped>
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