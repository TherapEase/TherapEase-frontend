<template>
  <NavBar></NavBar>
  <div>
  <h1 class="centro"><strong>Il tuo diario:</strong></h1>

  <div class="container">
    <DiarioTerapeutico class="diario"></DiarioTerapeutico>
    <div class="centro">
      <button class="auto btn btn-outline-dark size" src="/">Aggiungi</button>
      <button class="btn btn-outline-dark size">Modifica</button>
      <button class="btn btn-outline-dark size">Elimina</button>
    </div>
  </div>
    <CardDiario class="card"></CardDiario>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import DiarioTerapeutico from "@/components/DiarioTerapeutico.vue";
import CardDiario from '@/components/CardDiario.vue';
export default {
  name: "DiarioView",
  components: { NavBar, DiarioTerapeutico, CardDiario },
  data() {},
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
