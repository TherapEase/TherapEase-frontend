

<template>
  <!-- <h1>Prossime sedute:</h1> -->
  <div v-if="hasSedute == false" >
    <h5 style="text-align:center">Nessuna seduta prenotata</h5>
  </div>

  <div v-if="hasSedute == true" class="job-list">
    <li v-for="seduta in sedute" :key="seduta._id">
      <div class="colonna">
        <h2 class="font">
          <strong>Data: </strong>{{ seduta.data.slice(0, 10) }},
          <strong>Ore: </strong>{{ seduta.data.slice(11, 16) }}
        </h2>
        <h3 class="font">{{ seduta.indirizzo }}</h3>

        <button v-if="ruolo == 1" @click="allertaRimuovi(seduta)" class="size">
          rimuovi prenotazione
        </button>
      </div>
    </li>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import Swal from "sweetalert2";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "SedutePrenotate",
  props: { ruolo: Number },
  data() {
    return {
      sedute: [],
      hasSedute:false
    };
  },

  methods: {
    async allertaRimuovi(seduta) {
      Swal.fire({
        title: "Sei sicuro?",
        icon: "warning",
        text: "Se mancano meno di 24h alla seduta, il pagamento di verrà accreditato. Vuoi procedere comunque?",
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

      try {
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/annullaprenotazione`,
          options
        );

        const dati=await response.json();
        if(dati.successful){
        this.$router.go(0);}
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    const token = sessionStorage.getItem("token");
    this.$store.getters.returnUser;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/calendario/prenotate`,
        options
      );

      const dati = await response.json();

      if (this.sedute.indirizzo != "") {
        this.presenza = true;
      }
      this.sedute = dati["sedute"];
      if(this.sedute!=""){
        this.hasSedute=true
      }
    } catch (error) {
      console.log(error)
    }
  },
});
</script>

<style scoped>
.size {
  width: fit-content;
  border-radius: 0.5em;
}
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
  max-width: 500px;
  margin: 40px auto;
}

.job-list ul {
  padding: 0;
}

.job-list li {
  list-style-type: none;
  background: #a4af9e;
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

.font {
  font-size: 20px;
}
</style>
  
 