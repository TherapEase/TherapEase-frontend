<template>
  <NavBarVue></NavBarVue>
  <form class="forma" @submit.prevent>
    <h1 class="title spazio">Creazione nuovo slot</h1>

    <label class="spazio"
      ><strong
        >Inserisci la data e l'ora dell'inizio della seduta che vuoi
        creare:</strong
      ><input v-model="seduta.data" class="formData" type="datetime-local"
    /></label>
    <fieldset>
      <label class="spazio"
        ><strong>Scegli il metodo di erogazione della seduta:</strong>
        <label for="sede"
          ><input
            id="sede"
            @click="seduta.presenza = true"
            type="radio"
            name="erogazione"
            class="inline"
          />
          Sede</label
        >
        <label for="online"
          ><input
            id="online"
            @click="seduta.presenza = false"
            type="radio"
            name="erogazione"
            class="inline"
          />
          Online</label
        >
      </label>
    </fieldset>

    <input class="invia" type="submit" value="Crea" @click="allertaSeduta" />
  </form>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
import Swal from "sweetalert2";

export default {
  name: "NuovasedutaView",
  components: { NavBarVue },
  data() {
    return {
      seduta: { data: "", presenza: false },
      //andrà aggiunto l'attributo sede/presenza quando servirà
    };
  },

  methods: {
    // async presenza(){
    //   this.seduta.presenza="true",
    //   console.log(this.seduta.presenza)

    // },

    async allertaSeduta() {
      Swal.fire({
        title: "Avviso",
        icon: "info",
        text: `Stai creando una seduta il ${this.seduta.data.slice(
          0,
          10
        )} alle ${this.seduta.data.slice(11, 16)}`,
        showCancelButton: true,
        confirmButtonText: "Continua",
        cancelButtonText: "Cancella",
        confirmButtonColor: "#5b6c53",
      }).then((result) => {
        if (result.isConfirmed) {
          this.creaSeduta();
        }
      });
    },

    async creaSeduta() {
      const token = sessionStorage.getItem("token");
      if (this.inPresenza == false) {
        this.seduta.presenza == "false";
      } else {
        this.seduta.presenza == "true";
      }
      console.log(this.seduta.presenza);
      console.log(JSON.stringify(this.seduta));
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(this.seduta),
      };
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/definisci_slot`,
        options
      );

      const dati = await response.json();
      console.log(JSON.stringify(dati));
      if (dati.successful) {
        await Swal.fire({ title: "success", icon: "success" });
        this.$router.go(0);
      } else {
        await Swal.fire({
          title: "OPS...",
          icon: "error",
          text: "Qualcosa è andato storto"
        });
      }
    },
  },
};
</script>

<style>
.forma {
  background-color: white;
  border-radius: 1em;
  align-content: center;
  align-self: center;
  height: 500px;
  width: 700px;
  margin: 100px auto;
  padding-bottom: 2em;
  padding-top: 2em;
  text-align: center;
  padding-left: 20px;
}

label {
  display: block;
  text-align: left;
}

.formData {
  width: 90%;
  border-radius: 0.5em;
}

.spazio {
  padding-block: 1em;
  padding-bottom: 1em;
}

.title {
  font-weight: bold;
  padding-bottom: 20px;
  text-align: center;
}

.invia {
  display: block;
  width: 65%;
  margin: 1em auto;
  height: 2em;
  font-size: 1.1rem;
  background-color: #5b6c53;
  border-color: white;
  min-width: 200px;
  color: white;
  border-radius: 1em;
}
</style>