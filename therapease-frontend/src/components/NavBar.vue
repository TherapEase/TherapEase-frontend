

<template>
  <div class="white-header">
    <img class="logo" src="@/assets/Copertina.png" />
  </div>

  <div class="topnav">
    <a v-if="profilo" href="/dashboard">Home</a>
    <a v-else href="/">Home</a>

    <a href="/chisiamo">Chi siamo</a>
    <a href="/catalogo">I nostri Terapeuti</a>
    <a href="info">Info e Eventi</a>
    <a href="/offerta">La nostra Offerta</a>
    <a href="/supportotecnico">Supporto Tecnico</a>

    <div v-if="profilo" class="profilo">
      <img src="../assets/profilePic.webp" width="45" />
      <a href="/profilo">Il Mio Profilo</a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "NavBar",
  data() {
    return { profilo: false };
  },
  async mounted() {
    const token = sessionStorage.getItem("token");
    if (token != null) {
      this.profilo = true;
    }
  },
});
</script>

<style scoped>
.topnav {
  background-color: #2b3a24;
  overflow: hidden;
  z-index: 1000;
}
img {
  padding-right: 10px;
  padding-top: 10px;
  padding-left: 5px;
}
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.profilo {
  float: right;
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: #2b3a24;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #5b6c53;
  color: white;
}

.navigation-bar {
  width: 100%; /* i'm assuming full width */
  height: 80px; /* change it to desired width */
  background-color: white; /* change to desired color */
}

.logo {
  display: inline-block;
  vertical-align: top;
  height: 50px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 15px; /* if you want it vertically middle of the navbar. */
}
.navigation-bar > a {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
  height: 80px; /* if you want it to take the full height of the bar */
  line-height: 80px; /* if you want it vertically middle of the navbar */
}
.white-header {
  background-color: white;
}
</style>