<template>
  <div v-if="mode == 'invia' || mode == 'modifica'" class="container">
    <div class="center"></div>

    <label for="data"
      ><strong>Data:</strong> <br />
      <input v-model="pagina.data" type="date"
    /></label>

    <label v-if="mode == 'invia'" for="diario"
      ><strong>Scrivi il tuo diario:</strong><br />
      <input class="testo" v-model="pagina.testo" type="text"
    /></label>

    <label v-if="mode == 'modifica'" for="diario"
      ><strong>Modifica il tuo diario:</strong><br />
      <input class="testo" v-model="pagina.testo" type="text"
    /></label>

    <button
      v-if="mode == 'invia'"
      class="btn btn-outline-dark size"
      @click.prevent="scriviPagina"
    >
      Invia
    </button>
    <button
      v-if="mode == 'modifica'"
      class="btn btn-outline-dark size"
      @click.prevent="modificaPagina"
    >
      Modifica
    </button>
  </div>

  <div class="centre" v-if="mode == 'elimina'">
    <div style="width: 80%">
      <label for="data"
        ><strong>Data:</strong> <br />
        <input v-model="pagina.data" type="date"
      /></label>
      <button class="btn btn-outline-dark size" @click.prevent="eliminaPagina">
        Elimina
      </button>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CardDiario",
  props: { ruolo: Number, mode: String },
  data() {
    return {
      pagina: {
        data: "",
        testo: "",
      },
    };
  },
  methods: {
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
      console.log(dati.successful);
      if (dati.successful) {
        await Swal.fire({ title: "success", icon: "success" });
        this.$router.go(0);
      } else {
        await Swal.fire({
          title: "OPS...",
          icon: "error",
          text: "Forse la pagina che stai cercando di creare esiste già",
        });
      }
    },

    async modificaPagina() {
      console.log("sei dentro modifica")

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
        `${process.env.VUE_APP_ROOT_API}/modifica_pagina`,
        options
      );
      const dati = await res.json();
      console.log(dati.successful);
      if (dati.successful) {
        await Swal.fire({ title: "success", icon: "success" });
        this.$router.go(0);
      } else {
        await Swal.fire({
          title: "OPS...",
          icon: "error",
          text: "Forse la pagina che stai cercando di modificare non esiste",
        });
      }
    },

    async eliminaPagina() {
      console.log("sei dentro elimina")
      console.log("bodiadi", JSON.stringify(this.pagina.data))

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
        `${process.env.VUE_APP_ROOT_API}/elimina_pagina`,
        options
      );
      const dati = await res.json();
      console.log(dati.successful);
      if (dati.successful) {
        await Swal.fire({ title: "success", icon: "success" });
        this.$router.go(0);
      } else {
        await Swal.fire({
          title: "OPS...",
          icon: "error",
          text: "Forse la pagina che stai cercando di eliminare non esiste",
        });
      }
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
.size {
  margin: auto auto;
  width: 100px;
}

.container {
  margin: auto auto;
  background-color: white;
  width: 500px;
  height: 500px;
}

.centre {
  margin: auto auto;
  background-color: white;
  width: 500px;
  height: 150px;
  border-radius: 0.5em;
  padding-left: 10px;
  padding-top: 10px;
}
</style>