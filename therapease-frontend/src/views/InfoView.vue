<template>
  <NavBarVue></NavBarVue>
  <h1>Eventi e Informazioni</h1>
  <button v-if="user.ruolo==4" @click.prevent="(event) => form_aggiungi_evento()">Aggiungi evento</button>
  <div v-if="is_clicked" class="form_aggiunta_evento">
    <div class="form">
    <form @submit.prevent>
      <fieldset>

        <label for="titolo">
          Titolo:
          <input
            v-model="evento.titolo"
            id="titolo"
            name="titolo"
            type="text"
            required/>
          </label>

        <label for="data"
          >Data:
          <input
            v-model="evento.data"
            id="data"
            name="data"
            type="datetime-local"
            pattern="[a-z0-5]{8,}"
            required
        /></label>

        <label for="testo">
          Descrizione:
          <input
            v-model="evento.testo"
            id="testo"
            name="testo"
            type="text"
            required/>
          </label>


          <label for="foto">
          Foto:
          <input
            id="foto"
            name="foto"
            type="file"
            required/>
          </label>
        
      </fieldset>
      <input value="Aggiungi evento" type="submit" @click.stop="aggiungi_evento()" />
    </form>
  </div>
</div>
  <div>
    <form>
      <div class="job-list">
        <li v-for="evento in eventi" :key="evento._id">
          <div class="riga"><img src="../assets/evento.jpg" alt="foto evento" width="180" height="180">
            <div class="colonna">
              <h2>{{ evento.titolo }}</h2>
              <p>Data:  {{ evento.data.slice(0,10) }}</p>
              <p>Ora:  {{ evento.data.slice(11,16) }}</p>
              <p>{{ evento.testo }}</p>
              <button v-if="user.ruolo==4" @click.prevent="(event) => rimuovi(evento._id)">Rimuovi</button></div>
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
  name: "App",
  components: { NavBarVue },
  data() {
    return {
      eventi: [],
      user:{},
      is_clicked: false,
      evento:{
        titolo: "",
        //foto: "",
        data: "",
        testo: ""
      }
    };
  },

  methods:{
    async form_aggiungi_evento(){
      this.is_clicked=!this.is_clicked
    },

    async aggiungi_evento(){
      var info
      const token=sessionStorage.getItem('token')
      const options = {
            method: "POST",
            headers: { 
              "x-access-token": token,
              "Content-Type": "application/json" 
              },
            body: JSON.stringify(this.evento),
          };
          
          try {
              const res = await fetch(
                `${process.env.VUE_APP_ROOT_API}/aggiungi_evento`,
                options
              );
              info = await res.json();
              console.log("info:",JSON.stringify(info));


              // console.log(info.successful)
              if(info.successful) {
                this.$router.go(0)
              }
          } catch (error) {
            console.log(error);
          }
    },

    async rimuovi(id){
      const token=sessionStorage.getItem('token')
      try{

        const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/rimuovi_evento/${id}`,
        {
          method: "GET",
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
      }catch(error){
        console.log(error)
      }
      this.$router.go(0)
    }
  },
  async mounted() {

    const token=sessionStorage.getItem('token')
    if(token!=null){
      
      //get user
      const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      };
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
        options
      );
      const dati = await response.json();
      console.log(JSON.stringify(dati));
      this.user = dati["profile"];
      this.userRuolo = this.user.ruolo;
      }
    console.log("user:", this.user.ruolo)

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/eventi`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response["successful"]);
      const informazioni = await response.json();
      console.log(informazioni);
      console.log("eventi: " + JSON.stringify(informazioni["eventi"]));

      this.eventi = informazioni["eventi"];
      return this.eventi;
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

button{
  background-color:#2b3a24;
  color:white;
  border-radius: 0.5em;
  border-color: black;
}

.form_aggiunta_evento{
  background-color:white;
  border-radius: 0.5em;
  border-color: black;
  text-align: center;
  width: 40%;
  height: 240px;
  margin: auto auto;
}

label{
  padding-top: 10px;
}

.form{
  margin-top:  40px;
  margin-bottom:  40px;
  margin-left:  30px;


  text-align: center;
}
</style>