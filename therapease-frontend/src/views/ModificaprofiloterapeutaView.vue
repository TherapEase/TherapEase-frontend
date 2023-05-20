
<template>
  <main>
    <div>
      <NavBarVue />

    </div>
    <form class="card mb-4" @submit.prevent>
      <div class="card-header">
        <h4 class="card-heading">Modifica Profilo</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <div class="mb-4">
              <label class="form-label">Username</label>
              <input
              v-model="utente.username"
              id="username"
              name="username"
              type="text"
          />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Nome</label>
              <input v-model="utente.nome" id="nome" name="nome" type="text"/>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Cogmome</label>
              <input
                  v-model="utente.cognome"
                  id="cognome"
                  name="cognome"
                  type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-4">
              <label class="form-label">Email</label>
              <input
                  v-model="utente.email"
                  id="email"
                  name="email"
                  type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-4">
              <label class="form-label">Codice Fiscale</label>
              <input
                  v-model="utente.codice_fiscale"
                  id="cf"
                  name="cf"
                  type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Data di nascita</label>
              <input
                  v-model="utente.data_nascita"
                  id="datanascita"
                  name="datanascita"
                  type="date"
                  pattern="[a-z0-5]{8,}"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Documenti</label>
              <input
                  v-model="utente.documenti"
                  id="documenti"
                  type="text"
                  name="file"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Foto Profilo</label>
              <input id="profile-picture" type="file" name="file"/>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Indirizzo</label>
              <input
                  v-model="utente.indirizzo"
                  id="indirizzo"
                  name="indirizzo"
                  type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Numero clienti massimo</label>
              <input
                  v-model="utente.limite_clienti"
                  id="limite"
                  type="number"
                  min="1"
                  max="30"
                  name="limite"
              />
            </div>
          </div>

          <div class="col-md-12">
          </div>
          <div class="col-md-12">
            <div class="mb-0">
              <router-link to="/modificapassword">
                <button class="change_password">Change Password</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-primary" type="submit" @click="modifyProfilo">Conferma modifiche</button>
      </div>
    </form>


  </main>
</template>
  
  
<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "ModificaView",
  components: { NavBarVue },
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
        foto_profilo:"",
        indirizzo: "",
        limite_clienti: "",
        documenti: ""
      },
    };


  },

  methods: {

    async modifyProfilo(){

      var data;
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.utente),
      };

      const res = await fetch("http://localhost:3001/api/v1/modify_profilo", options)
      data = await res.json();
      console.log(data);

      if (data.successful) {
            this.$router.push("/profilo");
      } else {
        console.log(data.error || data.message);
      }


    }
  }



});





</script> 
  
<style scoped>
.card-body {
  background-color: rgb(157, 194, 152);
}

.card-heading {
  color: beige;
}

.card-header {
  background-color: rgb(72, 90, 70);
}

.card-footer {
  background-color: rgb(72, 90, 70);
}

.btn {
  display: block;
  width: 30%;
  margin: 1em auto;
  height: 2em;
  font-size: 1.1rem;
  background-color: #99bb8a;
  border-color: #1d2719;
  min-width: 300px;
  color: #1d2719;
}
</style>
  
  