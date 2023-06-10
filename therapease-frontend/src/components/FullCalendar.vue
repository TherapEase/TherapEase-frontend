
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        },
        dateClick: this.handleDateClick,
        events: [],
      },
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
    const response = await fetch(
      `${process.env.VUE_APP_ROOT_API}/calendario/prenotate`,
      options
    );

    const dati = await response.json();

    const dim = dati["sedute"].length;

    for (let i = 0; i < dim; i++) {
      this.calendarOptions.events.push({
        title:
          new Date(dati["sedute"][i]["data"]).getHours() +
          ":" +
          dati["sedute"][i]["data"].slice(14, 16) +
          "-" +
          `${new Date(dati["sedute"][i]["data"]).getHours() + 1}` +
          ":" +
          dati["sedute"][i]["data"].slice(14, 16),

        date: dati["sedute"][i]["data"].slice(0, 10),
      });
    }
  },
};
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>

