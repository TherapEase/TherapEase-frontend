<template>
  <NavBarVue></NavBarVue>
  <h1>Catalogo dei nostri terapeuti</h1>

  <div>
    <form>
      <div class="job-list">
        <li v-for="terapeuta in terapeuti" :key="terapeuta._id">
          <div class="riga">
            <img
              src="../assets/profilePic.webp"
              alt="foto profilo"
              width="100"
            />
            <div class="colonna">
              <h2>{{ terapeuta.nome }} {{ terapeuta.cognome }}</h2>
              <router-link
                :to="{ name: 'profiloId', params: { id: `${terapeuta._id}` } }"
                ><button v-if="user.ruolo == 1">
                  Visita profilo
                </button></router-link
              >
              <button
                v-if="user.ruolo == 4"
                @click.prevent="elimina(terapeuta._id)"
              >
                Elimina profilo
              </button>
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
      terapeuti: [],
      user: {},
      userRuolo: 1,
    };
  },
  async mounted() {
    const token = sessionStorage.getItem("token");
    if (token != null) {
      const opzioniRichiesta = {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
          opzioniRichiesta
        );
        const info = await res.json();

        this.user = info["profile"];
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/catalogo_terapeuti`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const informazioni = await response.json();
      this.terapeuti = informazioni["catalogo"];
      return this.terapeuti;
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async elimina(id) {
      const token = sessionStorage.getItem("token");

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };

      try {
        const res = await fetch(
          `${process.env.VUE_APP_ROOT_API}/profilo/${id}/elimina`,
          options
        );
        await res.json();

        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
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

button {
  background-color: #2b3a24;
  color: white;
  border-radius: 0.5em;
  border-color: black;
}
</style>