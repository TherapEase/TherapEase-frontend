<template>
   <nav-bar></nav-bar>
   <body>
    <h1><strong>Benvenuto</strong></h1>
   </body>

    
</template>

<script lang="ts">
import { defineComponent} from "vue"
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
    setup() {
        
    },
})
</script>

<style  scoped>

</style>