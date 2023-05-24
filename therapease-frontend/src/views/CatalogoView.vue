<template>
  <NavBarVue></NavBarVue>
  <h1>Catalogo dei nostri terapeuti</h1>

  <div>
    <form action="http://localhost:3000/catalogo_terapeuti">
      <div class="job-list">

        <li v-for="terapeuta in terapeuti" :key="terapeuta._id">
        
            
          <div class="riga"><img src="../assets/profilePic.webp" alt="foto profilo" width="100">
            <div class="colonna"><h2>{{ terapeuta.nome }} {{ terapeuta.cognome }}</h2>
           <router-link to="/profilo/:id"><button>Visita profilo</button></router-link></div>
             
            </div></li>
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
      terapeuti: {
        _id: "",
        nome: "",
        cognome: "",
        foto_profilo:"",
      },
    };
  },
  async mounted() {
   
    console.log("sono dentro");

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/catalogo_terapeuti",
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

      this.terapeuti = informazioni["catalogo"];
      return this.terapeuti;
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