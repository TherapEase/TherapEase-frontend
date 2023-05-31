<template>
  <NavBar></NavBar>
  <h1 class="centro"><strong>Il tuo diario:</strong></h1>
  <DiarioTerapeutico></DiarioTerapeutico>
  <div class="centro">
  <button src="/">Aggiungi</button>
  <button>Modifica</button>
  <button>Elimina</button>
</div>

</template>

<script>
import NavBar from "@/components/NavBar.vue";
import DiarioTerapeutico from "@/components/DiarioTerapeutico.vue";

export default {
  name: "DiarioView",
  components: { NavBar, DiarioTerapeutico },
  data() {},
};
</script>

<style scoped>
.centro {
    margin: auto auto;
    align-text: center;
}
</style>
