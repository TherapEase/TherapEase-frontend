<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data() {
    return {
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
    const response = await fetch(
      `${process.env.VUE_APP_ROOT_API}/leggi_pagine`,
      options
    );

    const dati = await response.json();
    const dim= dati["pagine"].length
    for (let i = 0; i < dim; i++) {
      this.events.push({
        start: dati["pagine"][i]["data"].slice(0, 10),
        end: dati["pagine"][i]["data"].slice(0, 10),
        title: dati["pagine"][i]["testo"]
      });
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
      style="height: 250px"
    />
  </div>
</template>

<style scoped>
.vuecal__title {
  background-color: #2b3a24;
}
.calendario {
  background-color: #f4f6f4;
}
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #e4f5ef;
}
.vuecal__title-bar {
  background-color: #2b3a24;
}
.vuecal__cell--current {
  background: none;
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: #e4f5ef;
}
.vuecal__cell--selected:before {
  border-color: #e4f5ef;
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background: none;
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: #e4f5ef;
}
</style>

<!-- .calendario{
  background-color: #f8f8f8cc;

} -->