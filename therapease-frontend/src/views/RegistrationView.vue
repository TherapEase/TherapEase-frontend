<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Registration Form</title>
      <link rel="stylesheet" href="styles.css" />
    </head>

    <div class="white-header">
      <img class="logo" src="@/assets/Copertina.png" />
    </div>

    <body>
      <div class="topnav">
        <a href="url_home">Chi siamo</a>
        <a href="url_news">I nostri Terapeuti</a>
        <a href="url_contatti">Supporto Tecnico</a>
        <a href="url_info">Info e Eventi</a>
      </div>

      <h1 class="titolo">Registrazione</h1>
      <p>Entra a far parte della community: inserisci le tue informazioni.</p>
      <form method="post" action="https://register-demo.freecodecamp.org">
        <fieldset>
          <label for="nome"
            >Nome: <input id="nome" name="nome" type="text" required
          /></label>
          <label for="cognome"
            >Cognome: <input id="cognome" name="cognome" type="text" required
          /></label>
          <label for="email"
            >Email: <input id="email" name="email" type="email" required
          /></label>
          <label for="cf"
            >Codice Fiscale <input id="cf" name="cf" type="text" required
          /></label>
          <label for="datanascita"
            >Data di nascita:
            <input
              id="datanascita"
              name="datanascita"
              type="date"
              pattern="[a-z0-5]{8,}"
              required
          /></label>
          <label for="password"
            >Password:
            <input
              id="password"
              name="password"
              type="password"
              pattern="[a-z0-5]{8,}"
              required
          /></label>
          <label for="conferma-password"
            >Conferma Password:
            <input
              id="conferma-password"
              name="conferma-password"
              type="conferma-password"
              pattern="[a-z0-5]{8,}"
              required
          /></label>
        </fieldset>
        <fieldset>
          <label for="cliente"
            ><input
              id="cliente"
              type="radio"
              name="account-type"
              class="inline"
              enabled
            />
            Cliente</label
          >
          <label for="terapeuta"
            ><input
              id="radioterapeuta"
              type="radio"
              name="account-type"
              class="inline"
            />
            Terapeuta</label
          >

          <label for="terms-and-conditions"
            ><input
              id="terms-and-conditions"
              type="checkbox"
              required
              name="terms-and-conditions"
              class="inline"
            />
            I accept the terms and conditions
          </label>
        </fieldset>
        <fieldset>
          <label for="profile-picture"
            >Inserisci una foto profilo:
            <input id="profile-picture" type="file" name="file"
          /></label>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </body>
  </html>
</template>
  
  
<script lang="ts">
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
});
</script> 
  
  
  

  <style scoped>
.white-header {
  background-color: #ffffff;
}

h1,
p {
  margin: 1em auto;
  text-align: center;
}

form {
  width: 60vw;
  max-width: 500px;
  min-width: 300px;
  margin: 0 auto;
  padding-bottom: 2em;
}

fieldset {
  border: none;
  padding: 2rem 0;
  border-bottom: 3px solid #dce1da;
}

fieldset:last-of-type {
  border-bottom: none;
}

label {
  display: block;
  text-align: left;
  margin: 0.5rem 0;
}

input,
textarea,
select {
  margin: 10px 0 0 0;
  width: 100%;
  min-height: 2em;
  border-radius: 0.5em;
}

input,
textarea {
  background-color: #dce1da;
  border: 1px solid #5b6c53;
  color: #2b3a24;
}

.titolo {
  padding-top: 1em;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 35px;
  font-weight: bold;
}
.inline {
  width: unset;
  margin: 0 0.5em 0 0;
  vertical-align: middle;
}

input[type="submit"] {
  display: block;
  width: 60%;
  margin: 1em auto;
  height: 2em;
  font-size: 1.1rem;
  background-color: #5b6c53;
  border-color: white;
  min-width: 300px;
  color: #dce1da;
}

input[type="file"] {
  padding: 1px 2px;
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
  