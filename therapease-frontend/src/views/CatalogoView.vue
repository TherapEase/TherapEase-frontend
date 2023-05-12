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


export default defineComponent({
  name: "InfoView",
  props: {
    msg: String,
  },
});
</script> 