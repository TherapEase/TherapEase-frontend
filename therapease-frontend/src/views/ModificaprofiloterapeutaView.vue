
<template>
  <main>
    <div>
      <NavBarVue />

    </div>
    <form class="card mb-4">
      <div class="card-header">
        <h4 class="card-heading">Modifica Profilo</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <div class="mb-4">
              <label class="form-label">Username</label>
              <input class="form-control" type="text" placeholder="Company" value="yourUsername">
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Nome</label>
              <input class="form-control" type="text" placeholder="Nome" value="Tizio">
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Cogmome</label>
              <input class="form-control" type="email" placeholder="Cognome" value="Caio">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-4">
              <label class="form-label">Email</label>
              <input class="form-control" type="text" placeholder="Email" value="tizio.caio@gmail.com">
            </div>
          </div>
          <div class="col-sm-6 col-md-6">
            <div class="mb-4">
              <label class="form-label">Codice Fiscale</label>
              <input class="form-control" type="text" placeholder="Codice Fiscale" value="TICA836JHGK872">
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Data di nascita</label>
              <input class="form-control" type="date">
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Documenti</label>
              <input class="form-control" type="file">
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Foto Profilo</label>
              <input class="form-control" type="file">
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Indirizzo</label>
              <input class="form-control" type="text">
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Città</label>
              <input class="form-control" type="text">
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">CAP</label>
              <input class="form-control" type="number">
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-0">
              <label class="form-label">Descrizione</label>
              <textarea class="form-control" rows="5"
                placeholder="Here can be your description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-primary" type="submit">Conferma modifiche</button>
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
  
  