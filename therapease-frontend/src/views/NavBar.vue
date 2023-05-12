

<template>
  <div class="white-header">
    <img class="logo" src="@/assets/Copertina.png" />
  </div>

  <div class="topnav">
    <a href="url_home">Chi siamo</a>
    <a href="url_news">I nostri Terapeuti</a>
    <a href="url_home">La nostra offerta</a>
    <a href="url_contatti">Supporto Tecnico</a>
    <a href="url_info">Info e Eventi</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "NavBar",
});
</script>

<style scoped>
.topnav {
  background-color: #2b3a24;
  overflow: hidden;
  z-index: 1000;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
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