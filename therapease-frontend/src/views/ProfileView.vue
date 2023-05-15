<template>
  <div>
        <div>
          <div>
            <nav-bar></nav-bar>
        </div>
          <section>
            <div class="row">
              <div class="col-lg-4">
                <div class="card card-profile mb-4">
                  <div class="card-header" style="background-image"> </div>
                  <div class="card-body text-center"><img class="card-profile-img" src="../assets/profilePic.webp" alt="Jassa Rich">
                    <h3 class="mb-3"> <strong>Tizio Caio</strong></h3>
                    <router-link to="/modifica"> <button class="btn btn-outline-dark btn-sm"><span class="fab fa-twitter"></span> Modifica</button></router-link>
                  </div>
                </div>
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0"><img class="avatar avatar-lg p-1" src="../assets/profilePic.webp" alt="Jassa Rich"></div>
                      <div class="flex-grow-1 ps-3">
                        <h4><strong>Terapeuta Associato: </strong>Mario Rossi</h4>
                        <router-link to="/terapeutaperutente"> <button class="btn btn-outline-dark btn-sm"><span class="fab fa-twitter"></span> Visita Profilo</button></router-link>
                        <ul class="social-links list-inline mb-0 mt-2">
                          <li class="list-inline-item"><a href="javascript:void(0)" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Nathan's Facebook" aria-label="Nathan's Facebook"><i class="fab fa-facebook"></i></a></li>
                          <li class="list-inline-item"><a href="javascript:void(0)" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="@nathan_andrews" aria-label="@nathan_andrews"><i class="fab fa-twitter"></i></a></li>
                          <li class="list-inline-item"><a href="javascript:void(0)" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="+420777555987" aria-label="+420777555987"><i class="fa fa-phone"></i></a></li>
                          <li class="list-inline-item"><a href="javascript:void(0)" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="@nathan" aria-label="@nathan"><i class="fab fa-skype"></i></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="card overflow-hidden mb-4">
                  <div class="card-header">
                    <h4 class="grassetto">Il mio profilo</h4>
                    <div class="informazioni">
                      <h5><strong>Username:</strong> TizioCaio2001</h5>
                      <h5><strong>Nome:</strong> TizioCaio2001</h5>
                      <h5><strong>Cognome:</strong> TizioCaio2001</h5>
                      <h5><strong>Data Di Nascita:</strong> TizioCaio2001</h5>
                      <h5><strong>Email:</strong>  TizioCaio2001</h5>
                      <h5><strong>Codice Fiscale:</strong> TizioCaio2001</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    
</template>

<script lang="ts">

//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  components: { NavBar },
  name: "ProfileView",
  props: {
    msg: String,
  },
});
</script>

<style scoped>

.grassetto{
  font-size: 40px;
  color: rgb(37, 66, 37);
  font-family:Tahoma;
  font-weight: bold;
}
  .card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
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
body{
  font-family: Tahoma;
}
.text-primary {
  color: #4650dd !important;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
 
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

.lead {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: .7875rem;
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
img, svg {
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
.form-control
{
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}
.contentDiv
{
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
 