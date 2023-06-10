<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  props: { ruolos: Number },
  data() {
    return {
      user: {},
      events: [
        // {
        //   start: "2023-05-30 14:00",
        //   end: "2023-05-30 14:00",
        //   title: "Golf with John",
        // },
      ],
    };
  },
  async mounted() {
    const token = sessionStorage.getItem("token");

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
        options
      );
      const informazioni = await response.json();
      this.user = informazioni["profile"];
    } catch (error) {
      console.log(error);
    }

    if (this.user.ruolo == 1) {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/leggi_pagine`,
        options
      );

      const dati = await response.json();
      const dim = dati["pagine"].length;
      for (let i = 0; i < dim; i++) {
        this.events.push({
          start: dati["pagine"][i]["data"].slice(0, 10),
          end: dati["pagine"][i]["data"].slice(0, 10),
          title: dati["pagine"][i]["testo"],
        });
      }
    } else if (this.user.ruolo == 2) {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/leggi_pagine/${this.$route.params.id}`,
        options
      );
      const dati = await response.json();
      const dim = dati["pagine"].length;
      for (let i = 0; i < dim; i++) {
        this.events.push({
          start: dati["pagine"][i]["data"].slice(0, 10),
          end: dati["pagine"][i]["data"].slice(0, 10),
          title: dati["pagine"][i]["testo"],
        });
      }
    }
  },
};
</script>
<template>
  <div class="calendario">
    <vue-cal
      hide-view-selector
      :time="false"
      :events="events"
      active-view="day"
    />
  </div>
</template>

