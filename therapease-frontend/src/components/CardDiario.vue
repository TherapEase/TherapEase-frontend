<template>
    <div class="container">

        <div class="center"></div>
  <label  for="data"
    ><strong>Data:</strong> <br />
    <input v-model="pagina.data" type="date"
  /></label>
  <label  for="diario"
    ><strong>Scrivi il tuo diario:</strong><br />
    <input class="testo" v-model="pagina.testo" type="text"
  /></label>
  <button class="btn btn-outline-dark size " @click="AlertScriviPagina" >Invia</button>
</div>
</template>


<script>
import { defineComponent } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CardDiario",
  props: { ruolo: Number },
  data() {
    return {
      pagina: {
        data: "",
        testo: "",
      },
    };
  },
  methods: {
    AlertScriviPagina(){
      Swal.fire('Success')
      this.scriviPagina()
      
    },
    async scriviPagina() {
      console.log(JSON.stringify(this.pagina));
      const token = sessionStorage.getItem("token");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          "x-access-token": token,
        },
        body: JSON.stringify(this.pagina),
      };

      const res = await fetch(
        `${process.env.VUE_APP_ROOT_API}/crea_pagina`,
        options
      );
      const dati = await res.json();
      console.log(JSON.stringify(dati));
    },
  },
});
</script>

<style scoped>
.testo {
  width: 450px;
  height: 300px;
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
  width: 450px;
  min-height: 2em;
  border-radius: 0.5em;
}

input,
textarea {
  background-color: #dce1da;
  border: 1px solid #5b6c53;
  color: #2b3a24;
}
.size{
    margin: auto auto;
    width: 100px;
}

.container{
    margin: auto auto;
    background-color: white;
    width: 500px;
    height: 550px;

}

</style>