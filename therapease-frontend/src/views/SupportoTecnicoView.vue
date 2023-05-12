<script setup lang="ts">
  import Navbar from "../components/NavbarComponent.vue";
</script>


<template>
  <main>
    <body>
        <div>
            <Navbar></Navbar>
        </div>
    </body>
  </main>
</template>


<script lang="ts">
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "SupportoTecnico",
  props: {
    msg: String,
  },
});
</script> 