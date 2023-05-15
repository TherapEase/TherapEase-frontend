<template>
  <nav-bar></nav-bar>
  <h1>Catalogo dei nostri terapeuti</h1>

  <div>
    <div class="job-list">
      <transition-group name="list" tag="ul">
        <li v-for="terapeuta in terapeuti" :key="terapeuta.id">
          <div class="riga"><img src="src/assets/profilePic.webp" alt="foto profilo" width="70">
          <div class="colonna"><h2>{{ terapeuta.nome }} {{ terapeuta.cognome }}</h2>
         <button>Visita profilo</button></div>

         </div>
        
       
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {NavBar },
  setup(){
    
    const terapeuti = [
      {
        nome: "Mario",
        cognome: "Rossi",
        id: "1",
      },
      {
        nome: "Giuseppe",
        cognome: "Verdi",
        id: "2",
      },
      {
        nome: "Sara ",
        cognome: "Rosa",
        id: "3",
      },
    
    ];
    return { terapeuti };
  },
});
</script>


<style scoped>

.riga{
  display: flex;
  flex-direction: row;
}
img{
  margin-right: 30px;
  margin-left: 30px;

}
.colonna{
  display: flex;
  flex-direction: column;
}

button{
  width: 100px;
}
h1{
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
}
</style>