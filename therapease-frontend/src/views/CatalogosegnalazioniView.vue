<template>
    <NavBarVue></NavBarVue>
    <h1>Segnalazioni non risolte </h1>
  
    <div>
      <form>
        <div class="job-list">
            <h4>Segnalazioni: </h4>
            <li v-for="segnalazione in segnalazioni" :key="segnalazione._id">
            <div class="riga"><img src="../assets/profilePic.webp" alt="foto profilo" width="100">
                <div class="colonna"><h2>{{ segnalazione.testo }} {{ segnalazione.segnalato }} {{ segnalazione.data }}</h2>
            </div>
            <button @click.prevent="gestisci_segnalazione(segnalazione._id)">
                Gestisci
            </button>
            </div></li>
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
        segnalazioni: []

      };
    },
    async mounted() {

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_segnalazioni`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
          },
        }
      );

      console.log(response["successful"]);

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const info = await response.json();
      console.log(info);
      console.log("catalogo: " + JSON.stringify(info["catalogo"]));
      this.segnalazioni = info["catalogo"]
      return this.segnalazioni;
    } catch (error) {
      console.log(error);
    }
    },

    methods: {

      //gestione segnalazioni
        async gestisci_segnalazione(id){
            const token=sessionStorage.getItem("token");
            console.log("stai gestendo la segnalazione")
            console.log("token in gestione: "+token)

            const options={
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
            };

            try{
                const res = await fetch(
                    `${process.env.VUE_APP_ROOT_API}/segnalazione/gestisci/${id}`, 
                    options
                )
                const i = await res.json()
                console.log(i.successful)
                console.log("gestita: "+JSON.stringify(i))
                this.$router.go(0)
            } catch(error) {
                console.log(error);
            }
            }
    }
    
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
    max-height: 35px;
  }
  
  </style>