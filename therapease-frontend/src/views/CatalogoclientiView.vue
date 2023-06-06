<template>
    <NavBarVue></NavBarVue>
    <h1>Catalogo dei nostri clienti</h1>
  
    <div>
      <form>
        <div class="job-list">
            <h4>Clilenti: </h4>   
            <li v-for="cliente in clienti" :key="cliente._id">
                    
            <div class="riga"><img src="../assets/profilePic.webp" alt="foto profilo" width="100">
                <div class="colonna"><h2>{{ cliente.nome }} {{ cliente.cognome }}</h2>
                <button @click.prevent="elimina(cliente._id)" class="rimozione_forzata">Rimuovi profilo</button></div>
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
        user:{},
        clienti: []
      };
    },
    async mounted() {
        try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_clienti`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log(response["successful"]);

      // if (!response.successful) {
      //   throw new Error("Unable to get user");
      // }
      const data = await response.json();
      console.log(data);
      console.log("catalogo: " + JSON.stringify(data["catalogo"]));

      this.clienti = data["catalogo"];
      return this.clienti;
    } catch (error) {
      console.log(error);
    }
    },

    methods: {
      async elimina(id){
        const token=sessionStorage.getItem("token");
            console.log("stai eliminando il profilo di un cliente")
            console.log("token in elimina: "+token)

            const options={
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
            };

            try{
                const res = await fetch(
                    `${process.env.VUE_APP_ROOT_API}/profilo/${id}/elimina`, 
                    options
                )
                const i = await res.json()
                console.log(i.successful)
                console.log("eliminato: "+JSON.stringify(i))
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
  }
  
  </style>