<template>
  <NavBar></NavBar>
  <div>
  <h1 class="centro"><strong>Il tuo diario:</strong></h1>

  <div class="container">
    <DiarioTerapeutico class="diario"></DiarioTerapeutico>
    <div class="centro">
      <button class="auto btn btn-outline-dark size"  @click="showModify=false; showAdd=true; showDelete=false ">Aggiungi</button>
      <button class="btn btn-outline-dark size" @click="showModify=true ; showAdd=false ; showDelete=false ">Modifica</button>
      <button class="btn btn-outline-dark size" @click="showModify=false ; showAdd=false ; showDelete=true ">Elimina</button>
    </div>
  </div>
    <CardDiario v-if="showAdd" mode="invia" class="card"></CardDiario>
    <CardDiario v-if="showModify" mode="modifica" class="card"></CardDiario>
    <CardDiario v-if="showDelete" mode="elimina" class="card"></CardDiario>

  </div>
  
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import DiarioTerapeutico from "@/components/DiarioTerapeutico.vue";
import CardDiario from '@/components/CardDiario.vue';
export default {
  name: "DiarioView",
  components: { NavBar, DiarioTerapeutico, CardDiario },
  data() {return{
    showAdd:false,
    showModify:false,
    showDelete:false
  
  
  }
  },
};
</script>

<style scoped>
.centro {
  margin-top: 10%;
  margin: auto auto;
  text-align: center;
}
h1 {
  padding-top: 20px;
  padding-bottom: 20px;
}
.container {
  margin: auto auto;
  background-color: white;
  width: 500px;
  height: 550px;
  margin-bottom: 30px;
}

.btn {
  margin-top: 10%;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}

.diario {
  width: 90%;
  height: 70%;
  margin-top: 40px;
}
</style>
