<template>
    <div>
      <form>
        <div class="job-list">
          <li v-for="recensione in recensioni" :key="recensione._id">
  
    
              <div class="colonna">
                <h5> Data: {{ recensione.data.slice(0,10) }}</h5>

                <h4> <strong>Voto:</strong>  {{ recensione.voto }}</h4>
                <h4> <strong>Recensione: </strong>{{ recensione.testo }}</h4>

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
    name: "CardRecensioni",
    props: { ruolo: Number, profilo:String },
    data() {
      return {
        recensioni:[],
        user:{}

      };
    },
    methods:{},
  
    async mounted() {
      const token = sessionStorage.getItem("token");
  
      const opzioniRichiesta = {
        method: "GET",
        headers: {
            "Content-Type": "application/json" ,
          "x-access-token": token,
        },
      };

      try {
        //probabilmente la fetch cambierà
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
          opzioniRichiesta
        );
        const dati = await response.json();
        this.user = dati["profile"]
        
      } catch (error) {
        console.log(error);
      }

      
    
      if(this.user.ruolo==2){
      try {
        //probabilmente la fetch cambierà
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/le_mie_recensioni`,
          opzioniRichiesta
        );
        const dati = await response.json();
        console.log(JSON.stringify(dati));
        console.log("catalogo recensioni: " + dati["catalogo"]);
        this.recensioni = dati["catalogo"]
        console.log("recensioni"+dati["successful"]);
        
      } catch (error) {
        console.log(error);
      }}

      if(this.user.ruolo==1){
      try {
        //probabilmente la fetch cambierà
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/recensioni_associato/${this.$route.params.id}`,
          opzioniRichiesta
        );
        //console.log(`the route is: ${process.env.VUE_APP_ROOT_API}//recensioni_associato/${this.$ruote.params.id}`)
        const dati = await response.json();
        console.log(JSON.stringify(dati));
        console.log("catalogo recensioni: " + dati["catalogo"]);
        this.recensioni = dati["catalogo"]
        console.log("recensioni"+dati["successful"]);
        
      } catch (error) {
        console.log(error);
      }}



    },
  
  });
  </script>
  
  
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