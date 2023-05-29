<template>
  <NavBarVue></NavBarVue>
  <h1 class="tit">Calendario sedute prenotate</h1>
  <div class="container"><FullCalendar class="calendario"></FullCalendar></div>
</template>
  
  <script>
  //importing bootstrap 5 Modules
  import "bootstrap/dist/css/bootstrap.min.css";
  import { defineComponent } from "vue";
  import NavBarVue from "@/components/NavBar.vue";
  import FullCalendar from "@/components/FullCalendar.vue"
  
  export default defineComponent({
    components: { NavBarVue, FullCalendar},
    name: "ProfileView",
    props: {
      msg: String,
    },
  
    data() {
      return {
       
      };
    },
    methods: {
      
      }, 
  
  });
  </script>

<style>
.calendario {
  width: 90%;
  height: 90%;
  
  margin: auto auto;
  margin-top: 50px;
}

.container{
  width: 800px;
  height: 800px;
  margin: auto auto;
  margin-top: 30px;
  padding-top: 1px;
  border-radius: 1em;
  background-color: white;
}

.tit{
  text-align: center;
  font-weight: bold;
  margin-top: 1%;
}
</style>