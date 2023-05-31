<template>
  <div class="white-header inline">
    <img class="logo" src="@/assets/logo.jpeg" />
  </div>
  <h1 class="titolo">Log In</h1>
  <p>Bentornato! Inserisci le tue credenziali</p>
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
      <label for="password"
        >Password:
        <input
          v-model="utente.password"
          id="password"
          name="password"
          type="password"
          required
      /></label>
    </fieldset>

    <input type="submit" @click.stop="login" value="Log In" />
  </form>
  <h3>
    Non sei ancora registrato?
    <router-link to="/registrazione">Registrati!</router-link>
  </h3>
</template>
  
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",

  data() {
    return {
      utente: {
        username: "",
        password: "",
      },
      error: {
        status: false,
        messaggio: "Messaggio di default.",
      },
    };
  },

  

  methods: {
    async getUserInfo(token) {
      const opzioniRichiesta = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      console.log("siamo in get infooooooooo");

      const res = await fetch(
        `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
        opzioniRichiesta
      );
      const data = await res.json();
      console.log(data.successful);
      console.log("DATA: " + JSON.stringify(data));

      try {
        if (data.successful) {
          const user = data["profile"];
          console.log(
            "RETURN DELLA FUNZIONE GET MY PROFILO" + JSON.stringify(user)
          );
          return user;
        } else {
          this.error.status = true;
          this.error.messaggio =
            data?.error || data?.message || "Errore inaspettato";
          throw new Error("Impossibile prendere le informazioni del profilo");
        }
      } catch (e) {
        this.error.status = true;
      }
    },

    async login() {


      console.log("siamo dentro")
        const opzioniRichiesta = {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.utente),
      };


        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/login`,
          opzioniRichiesta
        );
        const data = await res.json();


      try {
        if (data.successful) {
          const get_user_info = await this.getUserInfo(data["token"]);

          await this.$store.commit("setState", {
            token: data["token"],
            user: get_user_info,
          });

          this.$router.push("/dashboard");
        } else {
          this.error.status = true;
          this.error.messaggio =
            data?.error || data?.message || "Errore inaspettato";
        }
      } catch (e) {
        this.error.status = true;
      }
    },
  },
});
</script>
  

<style scoped>
.white-header {
  width: auto;
  height: 35vh;
  background-color: #ffffff;
}

body {
  width: 100%;
  height: 112vh;
  margin: 0em;
  /* background-color: #5b6c53; */
  color: #f5f6f7;
  font-family: Tahoma;
  font-size: 16px;
}

h3,
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

h3 {
  font-size: 1em;
}

input,
textarea {
  background-color: #dce1da;
  border: 1px solid #5b6c53;
  color: #2b3a24;
}

.titolo {
  padding-top: 1em;
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
  background-color: #51634a;
  border-color: #1d2719;
  min-width: 300px;
  color: #ccdbc6;
}

input[type="file"] {
  padding: 1px 2px;
}

.logo {
  /*display: inline-block;
 vertical-align: top;
  align: center; */
  width: 320px;
  height: 320px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>