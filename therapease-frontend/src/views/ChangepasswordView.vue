<template>
    <NavBarVue />
  
    <h1><strong>Benvenuto</strong></h1>
    <form class="form-inline">
    <div class="form-group">
        <label for="inputPassword6">New Password</label>
        <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline">
        <label for="inputPassword6">Confirm New Password</label>
        <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline">
    </div>
    </form>
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
  
  
<style  scoped>



</style>