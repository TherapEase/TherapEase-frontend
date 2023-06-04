<template>
  <div>
    <h1 class="tit" v-if="profilo=='dashboard'"><strong>I tuoi clienti</strong></h1>
    <form>
      <div class="job-list">
        <li v-for="cliente_associato in clienti_associati" :key="cliente_associato._id">

          <div class="riga">
            <img
              src="../assets/profilePic.webp"
              alt="foto profilo"
              width="100"
            />
            <div class="colonna">
              <h2>{{ cliente_associato.nome }} {{ cliente_associato.cognome }}</h2>
              <router-link
                :to="{ name: 'profiloId', params: { id: `${cliente_associato._id}` } }"
                ><button>Visita profilo</button></router-link
              >
            </div>
          </div>
        </li>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import Swal from "sweetalert2";

export default defineComponent({
  name: "CardAssociati",
  props: { ruolo: Number, profilo:String },
  data() {
    return {
      ass: {},
      isAssociato:false,
      clienti_associati:[],

    };
  },
  methods:{},

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



    try {
      //probabilmente la fetch cambierà
      const response = await fetch(
        `http://localhost:3001/api/v1/catalogo_associati`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
          },
        }
      );
      const dati = await response.json();
      console.log(JSON.stringify(dati));
      console.log("catalogo: " + JSON.stringify(dati["catalogo"]));
      this.clienti_associati = dati["catalogo"]
      console.log(dati["successful"]);
      
      console.log(this.clienti_associati)
    } catch (error) {
      console.log(error);
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
    background: #a4af9e;
    padding: 16px;
    margin: 16px 0;
    border-radius: 1em;
  }
  
  .job-list h2 {
    margin: 0 0 10px;
    text-transform: capitalize;
    font-weight: bold;
  }
  
  
  .list-move {
    transition: all 1s;
  }
  
  button{
    background-color:#2b3a24;
    color:white;
    border-radius: 0.5em;
    border-color: black;
  }
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
    background: #a4af9e;
    padding: 16px;
    margin: 16px 0;
    border-radius: 1em;
  }
  
  .job-list h2 {
    margin: 0 0 10px;
    text-transform: capitalize;
    font-weight: bold;
  }
  
  
  .list-move {
    transition: all 1s;
  }
  
  button{
    background-color:#2b3a24;
    color:white;
    border-radius: 0.5em;
    border-color: black;
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