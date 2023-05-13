<template>
  <main>
    <body>
      <div>
        <nav-bar></nav-bar>
      </div>
      <h1>Chi Siamo</h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        numquam illo cumque praesentium quae voluptate itaque tempora eum
        consequatur maxime. Dolore, iste accusantium tenetur quas qui possimus
        ipsam debitis ullam?
      </h3>
      <h1>Domande Frequenti</h1>
      <div id="accordion" class="accordion-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'accordion',
        { 'is-open': isOpen.includes(index) }
      ]"
    >
      <div class="accordion-header" @click="toggleAccordion(index)">
        {{ item.title }}
        <i v-if="!isOpen.includes(index)" class="fal fa-plus"/>
        <i v-else class="fal fa-minus"/>
      </div>
      <div class="accordion-body">
        <div class="accordion-content">
          {{ item.text }}
          <strong>{{ item.sub }}</strong>
        </div>
      </div>
    </div>
  </div>
      <h1>Contatti</h1>
      <h3>Scrivici a: therapease@thera.pease</h3>
      <h3>Chiama: +391234567890, +390987654321</h3>
      <h3>Sede Legale: Via Stocazzo, n 69, Trento (TN)</h3>
      
    </body>
  </main>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "ChisiamoView",
  components: { NavBar },
  props: {
    msg: String,
  },
  data() {
    return {
      items: [
        {
          title: "Domanda 1",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. noejn2fi2uh p2ègopgnronvl vlokq3hor i",
          sub: "Pellentesque risus mi"
        },
        {
          title: "Domanda 2",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit fwenfibwfob2ofn2oejnonvonofdnqsp1ijo32ifo2no2.",
          sub: "Pellentesque risus mi"
        },
        {
          title: "Domanda 3",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          sub: "Pellentesque risus mi"
        }
      ],
      isOpen: []
    };
  },
  methods: {
    toggleAccordion(index) {
      if (this.isOpen.includes(index)) {
        this.isOpen = this.isOpen.filter(i => i !== index);
        return;
      }

      this.isOpen.push(index);
    }
  }
});


</script> 

<style scoped>
  .accordion:not(.is-open) .accordion-body {
    display: none;
  }



</style>