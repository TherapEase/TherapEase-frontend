<template>
  <NavBarVue />


  <h1>Catalogo dei nostri terapeuti</h1>

  <div>
    <form action="http://localhost:3001/catalogo_terapeuti">
      <div class="job-list">
            <div class="riga"><img src="src/assets/profilePic.webp" alt="foto profilo" width="100">
              <div class="colonna">
                <router-link to="terapeutaperutente"><button>Visita profilo</button></router-link>
              </div>
            </div>
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
      user: this.$store.getters.returnUser,
      terapeuti: {
        nome: "",
        cognome: "",
      }
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

.salary {
  display: flex;
}

.salary img {
  width: 30px;
}

.salary p {
  color: #17bf66;
  font-weight: bold;
  margin: 10px 4px;
}

.list-move {
  transition: all 1s;
}</style>