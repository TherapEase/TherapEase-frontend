
<template>
  <main>
      <div>
        <NavBarVue />
      </div>


     <div class="centro">
      <h1><strong>Checkout not successful</strong></h1>
      <p>Abbiamo riscontrato dei problemi con il tuo pagamento, ti invitiamo a riprovare</p>
      <RouterLink to="/dashboard"><button class="bottone">Vai alla nostra offerta</button></RouterLink>
     </div>
  </main>
</template>


<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";

export default defineComponent({
  name: "SupportoView",
  components: { NavBarVue },
  data() {

  },

  async mounted() {
    const id_session= this.$route.query.id
    try{
      await fetch(
        `${process.env.VUE_APP_ROOT_API}/prodotto/checkout_failed/${id_session}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
    }catch(err){
      console.log(err);
    }
  },
});




</script> 

<style>

.centro{
  text-align: center;
  margin-top: 200px;
}

.bottone{
  margin-top: 30px;
  width:250px;
  height: 40px;
  background-color: white;
  border-radius: 0.5em;
  font-weight: bold;

}


</style>