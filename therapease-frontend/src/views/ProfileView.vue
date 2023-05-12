


<template>
  <main>
    <body>
        <div>
            <nav-bar></nav-bar>
        </div>
      <h1>Il mio profilo</h1>

    </body>
  </main>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  components: { NavBar },
  name: "ProfileView",
  props: {
    msg: String,
  },
});
</script> 