<template>
  <main>
    <body>
        <div>
            <nav-bar></nav-bar>
            
        </div>
      <h1>Catalogo</h1>

    </body>
  </main>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
  name: "CatalogoView",
  props: {
    msg: String,
  },
});
</script> 