<template>
  <h1 class="titolo">Inserisci prodotto</h1>
  <p>Questo prodotto verrà visualizzato e acquistato dai clienti sull'app</p>
  <div class="card">
    <form @submit.prevent>
      <fieldset>
        <label for="nome"
          >Nome del prodotto
          <input
            v-model="prodotto.nome"
            id="nome"
            name="nome"
            type="text"
            required
        /></label>
        <label for="prezzo"
          >Prezzo del prodotto:
          <input
            v-model="prodotto.prezzo"
            id="prezzo"
            name="prezzo"
            type="Number"
            required
        /></label>
        <label for="n_gettoni"
          >Numero gettoni:
          <input
            v-model="prodotto.n_gettoni"
            id="n_gettoni"
            name="n_gettoni"
            type="Number"
            required
        /></label>
      </fieldset>
      <input
        value="Inserisci prodotto"
        type="submit"
        @click.stop="inserisci()"
      />
    </form>
  </div>
</template>
  
  
    
  <script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InserisciprodottoView",
  props: {
    msg: String,
  },
  data() {
    return {
      user: {},
      prodotto: {
        nome: "",
        prezzo: "",
        n_gettoni: "",
      },
    };
  },
  methods: {
    async inserisci() {
      const token = sessionStorage.getItem("token");

      //segnalazione

      var info;
      const options = {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.prodotto),
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/prodotto/inserisci`,
          options
        );
        info = await res.json();

        if (info.successful) {
          this.$router.push(`/offerta`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script> 
    
    
  <style scoped>
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
    