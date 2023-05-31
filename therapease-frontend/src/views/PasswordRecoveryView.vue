<template>
    <div class="white-header inline">
      <img class="logo" src="@/assets/logo.jpeg" />
    </div>
    <h1 class="titolo">Recupero Password</h1>
    <p>Compila i campi sottostanti per ricevere una nuova password via mail</p>
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
        <label for="mail"
          >E-mail:
          <input
            v-model="utente.mail"
            id="mail"
            name="mail"
            type="mail"
            required
        /></label>
        <label for = "cf">
            Codice Fiscale:
            <input
                v-model="utente.cf"
                id="cf"
                name="cf"
                type="cf"
                required/>
        </label>
      </fieldset>
  
      <input type="submit" @click.stop="recupero_password" value="Recupera Password" />
    </form>
  </template>
<script>

import { defineComponent } from 'vue';

export default defineComponent({
    name: "PasswordRecoveryPage",

    data() {
        return{
            utente:{
                username: "",
                mail: "",
                cf: ""
            },
            error:{
                status:false,
                messaggio: "Messaggio di default",
            }
        }
    },

    methods:{
        async recupero_password(){

            const opzioniRichiesta = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.utente)
            }

            const res = await fetch(
                `${process.env.VUE_APP_ROOT_API}/recuperopassword`, opzioniRichiesta
            )
            const data = await res.json()

            try {
                if(data.successful){
                    console.log("SUCCESSO")
                    this.$router.push("/login")
                }else{
                    alert(data.message)
                }
            } catch (error) {
                console.log("Errore: "+error)
            }
        }
    }
})
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