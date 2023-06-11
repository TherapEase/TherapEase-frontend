<template>
  <div style="text-align:center" v-if="hasSedute == false && ruolo == 2">
    <h3 class="top"><strong>Attenzione</strong></h3>
    <h4>Se non hai ancora creato nessuna slot per erogare le tue sedute.</h4>
    <h4>Ti invitiamo a creare slot secondo le tue disponibilità.</h4>
    <router-link to="/nuovaseduta"
      ><button class="custom">Crea una seduta</button></router-link
    >
  </div>

  <div class="job-list">
    <li v-for="seduta in sedute" :key="seduta._id">
      <div class="colonna">
        <h2 class="fontsize">
          <strong>Data: </strong>{{ seduta.data.slice(0, 10) }},
          <strong>Ore: </strong>{{ new Date(seduta.data).getHours() }}:{{
            seduta.data.slice(14, 16)
          }}
        </h2>
        <h3 class="fontsize" v-if="presenza">{{ seduta.indirizzo }}</h3>
        <h3 v-if="!presenza">Online</h3>

        <button v-if="ruolo == 1" @click="allertaPrenota(seduta)">
          Prenota
        </button>
        <button v-if="ruolo == 2" @click="allertaElimina(seduta)">
          Rimuovi
        </button>
      </div>
    </li>
  </div>
</template>
  
  <script>
import Swal from "sweetalert2";
export default {
  name: "PrenotaSeduta",
  props: { ruolo: Number },
  data() {
    return {
      sedute: [],
      presenza: false,
      hasSedute: false,
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

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/calendario/disponibili`,
        options
      );

      const dati = await response.json();

      if (this.sedute.indirizzo != "") {
        this.presenza = true;
      }

      this.sedute = dati["sedute"];
      if (this.sedute != "") {
        this.hasSedute = true;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
  
  
  <style scoped>
.riga {
  display: flex;
  flex-direction: row;
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
  border-radius: 1em;
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