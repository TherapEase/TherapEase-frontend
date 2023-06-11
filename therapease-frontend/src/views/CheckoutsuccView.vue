
<template>
  <main>
      <div>
        <NavBarVue />

      </div>
      <div v-if="is_successful==true" class="centro">
      <h1><strong>Checkout successful</strong></h1>
      <p>Il pagamento è avvenuto con successo, i gettoni ti verranno accreditati immediatamente</p>
      <RouterLink to="/dashboard"><button class="bottone">Vai alla dashboard</button></RouterLink>
     </div>

     <div v-if="is_successful==false" class="centro">
      <h1><strong>Checkout not successful</strong></h1>
      <p>Abbiamo riscontrato dei problemi con il tuo pagamento, ti invitiamo a contattare il <strong>supporto tecnico </strong><br>o di scrivere una mail all'indirizzo <strong>therapease.ingsw@gmail.com</strong></p>
      <RouterLink to="/supportotecnico"><button class="bottone">Vai al supporto tecnico</button></RouterLink>
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
    return {
      is_successful: false
    };
  },

  async mounted() {
    const id_session= this.$route.query.id
    try{
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/prodotto/checkout_success/${id_session}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const dati= await response.json()
      if(dati.successful==true){
        this.is_successful=true
      }
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