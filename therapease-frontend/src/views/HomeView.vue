
<template>
 <main>
    <!--  <div class="white-header">
      <img class="logo" src="@/assets/Copertina.png" />
    </div>

    <div class="topnav">
      <a href="/">Home</a>
      <a href="/chisiamo">Chi siamo</a>
      <a href="/catalogo">I nostri Terapeuti</a>
      <a href="info">Info e Eventi</a>
      <a href="/offerta">La Nostra Offerta</a>
      <a href="/supportotecnico">Supporto Tecnico</a>
    </div> -->

    <nav-bar></nav-bar>

    <div class="presentazione">
      <h1>Benvenuti su TherapEase</h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        numquam illo cumque praesentium quae voluptate itaque tempora eum
        consequatur maxime. Dolore, iste accusantium tenetur quas qui possimus
        ipsam debitis ullam?
      </h3>
      <div class="bottoni">
        <router-link to="/login"> <button>Accedi</button></router-link>

        <router-link to="/registrazione"><button>Registrati</button></router-link>

      </div>
    </div>
    <div class="chisiamo">
      <h1>Perchè Therapease?</h1>
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus in
        amet consequuntur voluptatum perferendis fugiat, odio totam aut corporis
        officiis! Nobis non assumenda nostrum doloribus illo odio natus fugit
        temporibus!
      </h3>
    </div>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  components: { NavBar },
  name: "HomeView",
});
</script>

<style scoped>
h3 {
  font-size: 1em;
}

.white-header {
  background-color: white;
}

.bottoni {
  padding-top: 30px;
  margin: 1em auto;
  text-align: center;
}

button {
  margin-right: 30px;
  outline: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font: bold 12px Arial, Helvetica, sans-serif;
  color: #2b3a24;
  padding: 10px 20px;
  background: white;
  border-radius: 1em;
}

.chisiamo {
  background-color: #ddd;
  height: 500px;
}

.presentazione {
  height: 500px;
  padding-top: 30px;
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

h1,
h3 {
  margin: 1em auto;
  text-align: center;
}

h1 {
  padding-top: 30px;
  font-weight: bold;
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
  width: 100%;
  /* i'm assuming full width */
  height: 80px;
  /* change it to desired width */
  background-color: white;
  /* change to desired color */
}

.logo {
  display: inline-block;
  vertical-align: top;
  height: 50px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 15px;
  /* if you want it vertically middle of the navbar. */
}

.navigation-bar>a {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
  height: 80px;
  /* if you want it to take the full height of the bar */
  line-height: 80px;
  /* if you want it vertically middle of the navbar */
}</style>