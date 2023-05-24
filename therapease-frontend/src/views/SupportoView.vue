
<template>
  <main>
      <div>
        <NavBarVue />

      </div>
      <h1>Supporto tecnico</h1>
  </main>
</template>


<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";


//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "SupportoView",
  components: { NavBarVue },
  props: {
    msg: String,
  },
});
</script> 