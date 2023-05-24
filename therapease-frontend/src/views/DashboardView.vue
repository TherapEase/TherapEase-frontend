<template>
  <NavBarVue />

  <h1><strong>Benvenuto</strong></h1>
</template>

<script>
import { defineComponent } from "vue"
import NavBarVue from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBarVue },
  setup() {

  },
})
</script>


<style  scoped></style>