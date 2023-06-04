<template>
  <NavBarVue></NavBarVue>
  <h1>Eventi e Informazioni</h1>

  <div>
    <form>
      <div class="job-list">

        <li v-for="evento in eventi" :key="evento._id">
          <div class="riga"><img src="../assets/evento.jpg" alt="foto evento" width="180" height="180">
            <div class="colonna">
              <h2>{{ evento.titolo }}</h2>
              <p>Data:  {{ evento.data.slice(0,10) }}</p>
              <p>Ora:  {{ evento.data.slice(11,16) }}</p>
              <p>{{ evento.testo }}</p>
            </div>
          </div>
        </li>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: { NavBarVue },
  data() {
    return {
      eventi: []
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/eventi`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response["successful"]);
      const informazioni = await response.json();
      console.log(informazioni);
      console.log("eventi: " + JSON.stringify(informazioni["eventi"]));

      this.eventi = informazioni["eventi"];
      return this.eventi;
    } catch (error) {
      console.log(error);
    }
  },
});
</script>


<style scoped>
.riga {
  display: flex;
  flex-direction: row;
}

img {
  margin-right: 30px;
  margin-left: 30px;
}

.colonna {
  display: flex;
  flex-direction: column;
}

button {
  width: 130px;
}

h1 {
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.job-list {
  max-width: 960px;
  margin: 40px auto;
}

.job-list ul {
  padding: 0;
}

.job-list li {
  list-style-type: none;
  background: white;
  padding: 16px;
  margin: 16px 0;
  border-radius: 1em;
}

.job-list h2 {
  margin: 0 0 10px;
  text-transform: capitalize;
  font-weight: bold;
}


.list-move {
  transition: all 1s;
}

button{
  background-color:#2b3a24;
  color:white;
  border-radius: 0.5em;
  border-color: black;
}

</style>