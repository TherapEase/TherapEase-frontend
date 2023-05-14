<template>
  <body>
  <div class="white-header inline">
    <img class="logo" src="@/assets/logo.jpeg" />
  </div>
  <h1 class="titolo">Log In</h1>
  <p>Bentornato! Inserisci le tue credenziali</p>
  <form method="post" action="https://register-demo.freecodecamp.org">
    <fieldset>
      <label for="username"
        >Username: <input id="username" name="username" type="text" required
      /></label>
      <label for="password"
        >Password:
        <input
          id="password"
          name="password"
          type="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          required
      /></label>
    </fieldset>
    <input type="submit" value="Log In" />
  </form>
  <h3>
    Non sei ancora registrato?
    <router-link to="/registrazione">Registrati!</router-link>
  </h3></body>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "LoginPage",
});
</script>
  

  <style scoped>

.white-header {
  width: auto;
  height: 35vh;
  background-color: #ffffff;
}

body {
  width: 100%;
  height: 112vh;
  margin: 0em;
  background-color: #5b6c53;
  color: #f5f6f7;
  font-family: Tahoma;
  font-size: 16px;
}

h3,h1,
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
  background-color: #99bb8a;
  border-color:#1d2719;
  min-width: 300px;
  color: #1d2719;
}

input[type="file"] {
  padding: 1px 2px;
}
.logo {
  /*display: inline-block;
 vertical-align: top;
  align: center; */
  width: 320px;
  height: 320px;
  display: block;
  margin-left: auto;
  margin-right: auto;

}

</style>