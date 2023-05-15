<template>
  <main>
    <body>
      <div>
        <nav-bar></nav-bar>
      </div>
      <div class="chisiamo">
        <h1>Chi Siamo</h1>
              <h3>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."     
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
                inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
                consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima 
                veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
              </h3>
      </div>
      <div class="domandefrequenti">
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
    </div>
    <div class="contatti">
        <h1>Contatti</h1>
        <h3>Scrivici a: therapease@thera.pease</h3>
        <h3>Chiama: +391234567890, +390987654321</h3>
        <h3>Sede Legale: Via Stocazzo, n 69, Trento (TN)</h3>
    </div>

      
      
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

  .chisiamo {
    height: 500px;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    font-family: Tahoma;
  }

  .accordion-header {
    text-decoration:rgb(35, 58, 35);
    font-size: 20px;
    font-family: Tahoma;
    text-decoration: underline;
  }

  .accordion-body {
    text-decoration: none;
    font-size: 15px;
    font-style: italic;
    font-family: Tahoma;
  }

  .domandefrequenti{
    font-family: Tahoma;
    text-align: center;
    padding-bottom: 25px;
  }

  .contatti{
    padding: 14px 16px;

    font-family: Tahoma;
    background-color: rgb(50, 70, 50);
    color: antiquewhite;
  }



</style>