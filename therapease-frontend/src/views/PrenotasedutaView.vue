<template>
  <NavBarVue></NavBarVue>
  <h1 v-if="user.ruolo == 1">Prenota una seduta</h1>
  <h1 v-if="user.ruolo == 2">Gestisci sedute</h1>

  <div class="nessuno" v-if="nessuno">
    <h3 class="top"><strong>Importante!</strong></h3>
    <h4>
      Se non sei associato a nessun terapeuta, non potrai prenotare sedute.
    </h4>
    <h4>Visita il nostro catalogo e trova il terapueta che fa per te.</h4>
    <router-link to="/catalogo"
      ><button class="custom">
        Vai al catalogo dei terapeuti
      </button></router-link
    >
  </div>
  <div>
    <sedute-disponibili :ruolo="user.ruolo"></sedute-disponibili>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import SeduteDisponibili from "@/components/SeduteDisponibili.vue";
import NavBarVue from "@/components/NavBar.vue";

export default {
  components: { SeduteDisponibili, NavBarVue },
  name: "PrenotasedutaView",
  data() {
    return {
      sedute: [],
      presenza: false,
      user: {},
      nessuno: false,
    };
  },
  methods: {
    async allertaPrenota(seduta) {
      Swal.fire({
        title: "Avviso",
        icon: "info",
        text: "Sei sicuro di voler prenotare?",
        showCancelButton: true,
        confirmButtonText: "Continua",
        cancelButtonText: "Cancella",
        confirmButtonColor: "#5b6c53",
      }).then((result) => {
        if (result.isConfirmed) {
          this.prenota(seduta);
        }
      });
    },
    async allertaElimina(seduta) {
      Swal.fire({
        title: "Avviso",
        icon: "info",
        text: "Sei sicuro di voler rimuovere lo slot?",
        showCancelButton: true,
        confirmButtonText: "Continua",
        cancelButtonText: "Cancella",
        confirmButtonColor: "#5b6c53",
      }).then((result) => {
        if (result.isConfirmed) {
          this.rimuovi(seduta);
        }
      });
    },

    async rimuovi(seduta) {
      const token = sessionStorage.getItem("token");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(seduta),
      };
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/definisci_slot/elimina`,
        options
      );

      await response.json();
      this.$router.push("/dashboard");
    },

    async prenota(seduta) {
      const token = sessionStorage.getItem("token");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(seduta),
      };
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/prenotazione`,
        options
      );

      await response.json();
      this.$router.push("/dashboard");
    },
  },
  setup() {},

  async mounted() {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await fetch(
      `${process.env.VUE_APP_ROOT_API}/calendario/disponibili`,
      options
    );

    const dati = await response.json();

    if (this.sedute.indirizzo != "") {
      this.presenza = true;
    }
    this.sedute = dati["sedute"];
    const res = await fetch(
      `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
      options
    );
    const utente = await res.json();
    this.user = utente["profile"];
    if (this.user.associato == "") {
      this.nessuno = true;
    }
  },
};
</script>


<style scoped>
.riga {
  display: flex;
  flex-direction: row;
}
.nessuno {
  text-align: center;
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
  background: white;
  padding: 16px;
  margin: 16px 0;
  border-radius: 4px;
}

.job-list h2 {
  margin: 0 0 10px;
  text-transform: capitalize;
}

.list-move {
  transition: all 1s;
}

button {
  background-color: #2b3a24;
  color: white;
  border-radius: 1em;
  border-color: black;
}

.fontsize {
  font-size: 22px;
}

.top {
  padding-top: 150px;
}

.custom {
  margin-top: 50px;
  width: 250px;
  border-radius: 0.5em;
}
</style>