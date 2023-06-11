
<template>
  <main>
    <div>
      <NavBarVue />
    </div>
    <div style="margin-top: 100px">
      <h1 style=" font-weight: bold; text-align: center">
        Supporto tecnico non ancora disponibile
      </h1>
      <h2 style="margin-top: 40px;font-weight: bold; text-align: center">Siamo spiacenti</h2>
      <h4 style="text-align: center">
        Al momento, la chat con il supporto tecnico è ancora in fase di elaborazione,<br />
        vi invitiamo a contattarci al nostro indirizzo di posta elettronica:<br />
        <strong>therapease.ingsw@gmail.com </strong>
      </h4>
    </div>
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