<template>
  <NavBarVue></NavBarVue>
  <h1>Segnalazioni non risolte</h1>

  <div>
    <form>
      <div class="job-list">
        <p style="text-align: center">
          Per motivi di privacy, i nomi dei segnalati rimarranno privati. Se
          ritieni che il motivo della <br />
          segnalazione sia valido, puoi procedere alla rimozione dell'account
          con l'apposito bottone
        </p>
        <li v-for="segnalazione in segnalazioni" :key="segnalazione._id">
          <div class="riga">
            <div class="colonna">
              <h2>Segnalato: {{ segnalazione.segnalato }}</h2>
              <p><strong>Data:</strong> {{ segnalazione.data.slice(0, 10) }}</p>
              <p><strong>Oggetto:</strong> {{ segnalazione.testo }}</p>

              <div>
                <button
                  @click.prevent="gestisci_segnalazione(segnalazione._id)"
                >
                  Gestisci
                </button>
                <button @click.prevent="allerta_elimina(segnalazione._id)">
                  Rimuovi profilo
                </button>
              </div>
            </div>
          </div>
        </li>
      </div>
    </form>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "App",
  components: { NavBarVue },
  data() {
    return {
      segnalazioni: [],
    };
  },
  async mounted() {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_segnalazioni`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      const info = await response.json();
      this.segnalazioni = info["catalogo"];
      return this.segnalazioni;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {


    async allerta_elimina(id){
      await Swal.fire({
        title: "Sei sicuro di voler procere?",
        text: `Se clicchi su "continua" l'account verrà eliminato `,
        showCancelButton: true,
        confirmButtonText: "Continua",
        cancelButtonText: "Cancella",
        confirmButtonColor: "#5b6c53",
        customClass: {
          confirmButton: "conferma",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.elimina(id);
        }
      });


    },





    //gestione segnalazioni
    async gestisci_segnalazione(id) {
      const token = sessionStorage.getItem("token");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/segnalazione/gestisci/${id}`,
          options
        );
        await res.json();
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },

    async elimina(id) {
      const token = sessionStorage.getItem("token");

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/profilo/${id}/elimina`,
          options
        );
        await res.json();
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
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
  font-weight: bold;
}

.list-move {
  transition: all 1s;
}

button {
  background-color: #2b3a24;
  color: white;
  border-radius: 0.5em;
  border-color: black;
  max-height: 35px;
}
</style>