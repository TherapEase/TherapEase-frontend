<template>
  <main>
    <div>
      <NavBarVue />
    </div>
    <h1>Info ed Eventi</h1>
  </main>
</template>


<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";


export default defineComponent({
  components: { NavBarVue },
  name: "InfoView",
  props: {
    msg: String,
  },
});

</script>

