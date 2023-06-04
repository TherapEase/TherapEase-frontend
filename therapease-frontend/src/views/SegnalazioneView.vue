<template>
    <h1 class="titolo">Segnalazioni</h1>
    <p>Facci sapere che cosa non va</p>
    <form @submit.prevent>
      <fieldset>
        <label for="testo"
          >Motivo della segnalazione
          <input
            v-model="segnalazione.testo"
            id="testo"
            name="testo"
            type="text"
            required
        /></label>
        <label for="data"
          >Quando è avvenuto l'episodio?:
          <input
            v-model="segnalazione.data"
            id="data"
            name="data"
            type="date"
            pattern="[a-z0-5]{8,}"
            required
        /></label>
      </fieldset>
      <input value="Invia segnalazione" type="submit" @click.stop="segnala()" />
    </form>
  </template>
  
  
    
  <script>
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "RegistrationView",
    props: {
      msg: String,
    },
    data() {
      return {
        user: {},
        segnalazione: {
          testo: "",
          data: "",
        },
      };
    },
    methods: {
      async segnala() {
      const token = sessionStorage.getItem('token')
      const opzioniRichiesta = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };
        console.log("il token è: "+token)
        console.log("sei dentro la funzione :))))");

        //my profilo per prendere il terapeuta associato
        try {
          const response = await fetch(
            `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
            opzioniRichiesta
          );
          const informazioni = await response.json();
          const teraAssociato = informazioni["profile"]["associato"]

          if (teraAssociato != "") {
            console.log("sei associato con: " + teraAssociato);
            this.isAssociato = true;
          }
          

        var info;
          const options = {
            method: "POST",
            headers: { 
              "x-access-token": token,
              "Content-Type": "application/json" 
              },
            body: JSON.stringify(this.segnalazione),
          };
          
          try {
            console.log("stai inviando la segnalazione")
              const res = await fetch(
                `${process.env.VUE_APP_ROOT_API}/segnalazione/${teraAssociato}`,
                options
              );
              info = await res.json();
              console.log(info);
          } catch (error) {
            console.log(error);
          }

      } catch (error) {
        console.log(error);
      }


        
      },
    },
  });
  </script> 
    
    
  <style scoped>
  .white-header {
    background-color: #ffffff;
  }
  
  h1,
  p {
    margin: 1em auto;
    text-align: center;
  }
  
  form {
    width: 60vw;
    max-width: 500px;
    min-width: 300px;
    margin: 0 auto;
    padding-bottom: 2em;
  }
  
  fieldset {
    border: none;
    padding: 2rem 0;
    border-bottom: 3px solid #dce1da;
  }
  
  fieldset:last-of-type {
    border-bottom: none;
  }
  
  label {
    display: block;
    text-align: left;
    margin: 0.5rem 0;
  }
  
  input,
  textarea,
  select {
    margin: 10px 0 0 0;
    width: 100%;
    min-height: 2em;
    border-radius: 0.5em;
  }
  
  input,
  textarea {
    background-color: #dce1da;
    border: 1px solid #5b6c53;
    color: #2b3a24;
  }
  
  .titolo {
    padding-top: 1em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 35px;
    font-weight: bold;
  }
  .inline {
    width: unset;
    margin: 0 0.5em 0 0;
    vertical-align: middle;
  }
  
  input[type="submit"] {
    display: block;
    width: 60%;
    margin: 1em auto;
    height: 2em;
    font-size: 1.1rem;
    background-color: #5b6c53;
    border-color: white;
    min-width: 300px;
    color: #dce1da;
  }
  
  input[type="file"] {
    padding: 1px 2px;
  }
  
  .topnav {
    background-color: #2b3a24;
    overflow: hidden;
    z-index: 1000;
  }
  
  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  
  /* Change the color of links on hover */
  .topnav a:hover {
    background-color: #ddd;
    color: #2b3a24;
  }
  
  /* Add a color to the active/current link */
  .topnav a.active {
    background-color: #5b6c53;
    color: white;
  }
  
  .navigation-bar {
    width: 100%; /* i'm assuming full width */
    height: 80px; /* change it to desired width */
    background-color: white; /* change to desired color */
  }
  .logo {
    display: inline-block;
    vertical-align: top;
    height: 50px;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 15px; /* if you want it vertically middle of the navbar. */
  }
  .navigation-bar > a {
    display: inline-block;
    vertical-align: top;
    margin-right: 20px;
    height: 80px; /* if you want it to take the full height of the bar */
    line-height: 80px; /* if you want it vertically middle of the navbar */
  }
  </style>
    