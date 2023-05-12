<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Registration Form</title>
      <link rel="stylesheet" href="styles.css" />
    </head>

    <div class="white-header">
      <img class="logo" src="@/assets/Copertina.png"/>
    </div>

    <body>
      <div class="topnav">

        <a href="/">Home
          <router-link to="/"></router-link>
        </a>

        <a href="/chisiamo">Chi siamo
          <router-link to="/chisiamo"></router-link>
        </a>
        <a href="/catalogo">I nostri Terapeuti
          <router-link to="/catalogo"></router-link>
        </a>
        <a href="/supportotecnico">Supporto Tecnico
          <router-link to="/supportotecnico"></router-link>
        </a>

        <a href="/info">Info e Eventi
          <router-link to="/info"></router-link>
        </a>

        <a href="/offerta">La Nostra Offerta
          <router-link to="/offerta"></router-link>
        </a>

        <a href="/profilo">Il Mio Profilo
          <router-link to="/profilo"></router-link>
        </a>
        
      </div>

    </body>
  </html>
</template>
  
  
  <script lang="ts">
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "Navbar",
  props: {
    msg: String,
  },
});
</script> 
  
<style scoped>
.white-header {
  background-color: #ffffff;
}


.topnav {
  background-color: #2b3a24;
  overflow: hidden;
  z-index: 1000;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
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
</style>
  