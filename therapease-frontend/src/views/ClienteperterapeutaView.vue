<template>
  <div>
    <div>
      <div>
        <NavBarVue />
      </div>
      <section>
        <div class="row">
          <div class="col-lg-4">
            <div class="card card-profile mb-4">
              <div class="card-header" style="background-image"></div>
              <div class="card-body text-center">
                <img
                  class="card-profile-img"
                  src="../assets/profilePic.webp"
                  alt="Jassa Rich"
                />
                <h3 class="mb-3">
                  <strong>{{ user.nome }} {{ user.cognome }}</strong>
                </h3>
                <button
                  @click="associa"
                  v-if="isAssociato == false"
                  class="btn btn-outline-dark btn-sm"
                >
                  Associa
                </button>
                <button
                  @click="disassocia"
                  v-if="isAssociato == true && isAssociatoConUtente == true"
                  class="btn btn-outline-dark btn-sm"
                >
                  Disassocia
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card overflow-hidden mb-4">
              <div class="card-header">
                <h4 class="grassetto">Informazioni</h4>
                <div class="informazioni">
                  <h5><strong>Username:</strong> {{ user.username }}</h5>
                  <h5><strong>Nome:</strong> {{ user.nome }}</h5>
                  <h5><strong>Cognome:</strong> {{ user.cognome }}</h5>
                  <h5>
                    <strong>Data Di Nascita:</strong> {{ user.data_nascita }}
                  </h5>
                </div>
              </div>
            </div>
            <div v-if="user.ruolo == 2" class="card mb-4">
              <h3 class="recensioni"><strong>Diario</strong></h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
    
  <script>
//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBarVue },
  name: "ProfileView",
  props: {
    msg: String,
  },
  data() {
    return {
      user: {},
      isAssociato: false,
      isAssociatoConUtente: false,
    };
  },
  async mounted() {
    const token = sessionStorage.getItem("token");
    const opzioniRichiesta = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };

    const param = this.$route.params.id;

    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/profilo/${param}`,
        opzioniRichiesta
      );

      if (!response.ok) {
        throw new Error("Unable to get user");
      }
      const informazioni = await response.json();
      this.user = informazioni["profilo"];
      this.user.data_nascita = this.user.data_nascita.slice(0, 10);
    } catch (error) {
      console.log(error);
    }

    //il mio profilo
    try {
      const response = await fetch(
        `${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,
        opzioniRichiesta
      );
      const informazioni = await response.json();
      const teraAssociato = informazioni["profile"]["associato"];
      if (teraAssociato == this.user._id) {
        this.isAssociatoConUtente = true;
      } else {
        this.isAssociatoConUtente = false;
      }

      if (teraAssociato != "") {
        this.isAssociato = true;
      }
      this.user.data_nascita = this.user.data_nascita.slice(0, 10);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async associa() {
      const token = sessionStorage.getItem("token");
      const opzioniRichiesta = {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      };
      const param = this.$route.params.id;

      try {
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/associazione/${param}`,
          opzioniRichiesta
        );
        const informazioni=await response.json();
        this.isAssociato = true;

        if (informazioni.successful) {
          this.$router.go(0);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async disassocia() {
      const token = sessionStorage.getItem("token");
      const opzioniRichiesta = {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      };
      const param = this.$route.params.id;

      try {
        const response = await fetch(
          `${process.env.VUE_APP_ROOT_API}/associazione/rimuovi/${param}`,
          opzioniRichiesta
        );
        const informazioni = await response.json();
        this.isAssociato = false;
        if (informazioni.successful) {
          this.$router.go(0);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
    
    <style scoped>
.recensioni {
  font-size: 40px;
  color: rgb(37, 66, 37);
  font-family: Tahoma;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.grassetto {
  font-size: 40px;
  color: rgb(37, 66, 37);
  font-family: Tahoma;
  font-weight: bold;
}
.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
  font-weight: bold;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body {
  font-family: Tahoma;
}
.text-primary {
  color: #4650dd !important;
}
h1,
.h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

.lead {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.7875rem;
}

.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);

  flex-wrap: wrap;
}
a {
  color: #4650dd;
  text-decoration: underline;
  cursor: pointer;
}
.card-profile-img {
  position: relative;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img,
svg {
  vertical-align: middle;
}
.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}
.form-control {
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}
.contentDiv {
  padding-top: 4rem;
}
.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}
</style>
     