<template>
  <h1 class="titolo">Registrazione</h1>
  <p>Entra a far parte della community: inserisci le tue informazioni.</p>
  <form @submit.prevent>
    <fieldset>
      <label for="username"
        >Username:
        <input
          v-model="utente.username"
          id="username"
          name="username"
          type="text"
          required
      /></label>
      <label for="nome"
        >Nome:
        <input v-model="utente.nome" id="nome" name="nome" type="text" required
      /></label>
      <label for="cognome"
        >Cognome:
        <input
          v-model="utente.cognome"
          id="cognome"
          name="cognome"
          type="text"
          required
      /></label>
      <label for="email"
        >Email:
        <input
          v-model="utente.email"
          id="email"
          name="email"
          type="text"
          required
      /></label>
      <label for="cf"
        >Codice Fiscale
        <input
          v-model="utente.codice_fiscale"
          id="cf"
          name="cf"
          type="text"
          required
      /></label>
      <label for="datanascita"
        >Data di nascita:
        <input
          v-model="utente.data_nascita"
          id="datanascita"
          name="datanascita"
          type="date"
          pattern="[a-z0-5]{8,}"
          required
      /></label>
      <label for="password"
        >Password:
        <input
          v-model="utente.password"
          title="La password deve contenere almeno 8 lettere, incluso una maiuscola, una minuscola e un carattere speciale"
          id="password"
          name="password"
          type="password"
          pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm"
          required
      /></label>
      <label for="conferma-password"
        >Conferma Password:
        <input
          v-model="confermaPassword"
          id="conferma-password"
          name="conferma-password"
          type="password"
          required
      /></label>
    </fieldset>
    <fieldset>
      <label for="cliente"
        ><input
          @click="iAmTerapeuta = false"
          id="cliente"
          type="radio"
          name="account-type"
          class="inline"
          enabled
        />
        Cliente</label
      >
      <label for="terapeuta"
        ><input
          @click="iAmTerapeuta = !iAmTerapeuta"
          id="radioterapeuta"
          type="radio"
          name="account-type"
          class="inline"
        />
        Terapeuta</label
      >
      <div v-if="iAmTerapeuta">
        <label for="indirizzo"
          >Indirizzo sede:
          <input
            v-model="utente.indirizzo"
            id="indirizzo"
            name="indirizzo"
            type="text"
        /></label>
        <label for="documento"
          >Allega il tuo certificato abilitazione:
          <input
            v-model="utente.documenti"
            id="documenti"
            type="text"
            name="file"
        /></label>
        <label for="limite"
          >Limite clienti:
          <input
            v-model="utente.limite_clienti"
            id="limite"
            type="number"
            min="1"
            max="30"
            name="limite"
        /></label>
      </div>

      <label for="terms-and-conditions"
        ><input
          id="terms-and-conditions"
          type="checkbox"
          required
          name="terms-and-conditions"
          class="inline"
        />
        I accept the terms and conditions
      </label>
    </fieldset>
    <fieldset>
      <label for="profile-picture"
        >Inserisci una foto profilo:
        <input id="profile-picture" type="file" name="file"
      /></label>
    </fieldset>
    <input value="Conferma" type="submit" @click.stop="sendForm" />
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
      utente: {
        username: "",
        password: "",
        ruolo: 0,
        nome: "",
        cognome: "",
        email: "",
        codice_fiscale: "",
        data_nascita: "",
        limite_clienti: "",
        indirizzo: "",
        documenti: "",
      },

      confermaPassword: "",
      error: {
        status: false,
        messaggio: "Messaggio di errore",
      },
      iAmTerapeuta: false,
    };
  },
  methods: {
    async sendForm() {
      if (this.iAmTerapeuta === false) {
        this.utente.ruolo = 1;
      } else {
        this.utente.ruolo = 2;
      }
      console.log(`il mio utente: ${JSON.stringify(this.utente)}`);
      console.log("sei dentro la funzione :))))");
      var data;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.utente),
      };
      try {
        if (this.confermaPassword === this.utente.password) {
          console.log("ok password uguali");

          const res = await fetch(
            `${process.env.VUE_APP_ROOT_API}/registrazione`,
            options
          );
          data = await res.json();
          console.log(data);

          if (data.successful) {
            this.$router.push("/dashboard");
          } else {
            console.log(data.error || data.message);
            this.error.status = true;
            this.error.messaggio =
              data.error || data.message || "Errore inaspettato, riprovare";
          }
        } else {
          console.log(
            `Pssw no uguali: ${this.confermaPassword} vs ${this.utente.password}`
          );
        }
      } catch (error) {
        console.log(error);
        this.error.status = true;
        this.error.messaggio =
          data.error || data.message || "Errore inaspettato, riprovare";
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
  