<template>
  <NavBarVue></NavBarVue>
  

  <div>
    <form>

      <div v-if="user.ruolo==4">
        <div class="job-list">
          <h4>Inserisci un nuovo prodotto Prodotto: </h4>   
          <router-link to="/inserisci_prodotto">
            <button> Inserisci</button>
          </router-link>
        </div>
      </div>

      <div class="job-list">

        <li v-for="prodotto in prodotti" :key="prodotto.nome"> 
          <div class="riga"><img src="../assets/tokens.png" alt="token" width="100">
            <div class="colonna">
              <h2>prodotto {{ prodotto.nome }}</h2>
              <h3>numero gettoni: {{ prodotto.n_gettoni }}</h3>
              <h3>prezzo: {{ prodotto.prezzo }}€ </h3>
              <div v-if="user.ruolo==1">
                <button @click.prevent="(event) => acquista(prodotto._id, event)">Acquista</button>
              </div>
              <div v-if="user.ruolo==4">
                <button @click.prevent="(event) => rimuovi(prodotto._id)">Rimuovi prodotto</button>
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

export default defineComponent({
  
  components: { NavBarVue },
  data() {
    return {
      prodotti:[], 
      isLogged:true,
      user: {},
    };
  },


    


 methods: {

  async rimuovi(id){
    console.log("rimozione")
    const token = sessionStorage.getItem('token')

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/prodotto/rimuovi/${id}`,
        {
          method: "DELETE",
          headers: { 
            "x-access-token": token,
            "Content-Type": "application/json"
          },
        }
      )
      const dati=await response.json()
      console.log(JSON.stringify(dati))

      this.$router.go(0)

    } catch(error) {
      console.log(error)
    }





  },





    async acquista(id, event){
      console.log("siamo dentro", event);
      const token = sessionStorage.getItem('token')
    

      try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/prodotto/checkout/${id}`,
        {
          method: "POST",
          headers: { 
            "x-access-token": token,
            "Content-Type": "application/json",
            "mode": "cors"
          },
        }
      )
      const dati=await response.json()
      if(!dati["successful"]){
        console.log("Not Ok");
        return;
      }
      console.log(`${process.env.VUE_APP_ROOT_API}/prodotto/checkout/${id}`)
      window.location=dati.url
      console.log(dati.url)

    } catch(error) {
      console.log(error)
    }
    }
  },

  async mounted() {
    const token=sessionStorage.getItem('token')
    console.log("il token: "+token)
    if(token==null){
      this.isLogged=false
    }

        //roba per prendere il ruolo
console.log("sto facendo la fetch my pprofilo")
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
    };
    const res = await fetch(
      `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
      options
    );
    const dati = await res.json();
    console.log(JSON.stringify(dati));
    this.user = dati["profile"];
    console.log("ruolo: "+this.user.ruolo)

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_prodotti`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response["successful"]);

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const informazioni = await response.json();
      console.log(informazioni);
      console.log("catalogo: " + JSON.stringify(informazioni["catalogo"]));

      this.prodotti = informazioni["catalogo"];
      return this.prodotti;
    } catch (error) {
      console.log(error);
    }



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
  border-radius: 4px;
}

.job-list h2 {
  margin: 0 0 10px;
  text-transform: capitalize;
  font-weight: bold;
}


.list-move {
  transition: all 1s;
}

button{
  background-color:#2b3a24;
  color:white;
  border-radius: 1em;
  border-color: black;
}

</style>