
<template>
      <div>
        <NavBarVue />

      </div>
      <h1>Supporto tecnico</h1>
      <div v-if="!isOpen">
        <button @click="open_new_chat" >Apri una nuova chat</button>
        <p v-for="id in this.open_chats" :key="id">
           {{ id }}
        </p>
      </div>
      
      <div v-else>

      <h1 class="headline">Vue.js Chat Box</h1>
      <!--Inizio area chat-->
      <main id="app">
        <section ref="chatArea" class="chat-area">
          <p v-for="message in this.chat.messaggi" :key="message.data" class="message" :class="{ 'message-out': message.mittente === this.utente._id, 'message-in': message.mittente !== this.utente._id }">
            {{ message.testo }}
          </p>
        </section>

        <section class="chat-inputs"> <!--non so come far apparire o uno o l'altro-->
          <button @click="get_all">Refresh</button>
          <form @submit.prevent="send_message" id="person2-form">
            <label for="person2-input">You</label>
            <input v-model="msg_txt" id="person2-input" type="text" placeholder="Type your message">
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      <!--Fine area chat-->
    </div>
</template>

<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";
import {io} from 'socket.io-client'
var socket= io(process.env.BACK_URL,{
        cors:{
            origin:process.env.BACK_URL
    }})

export default defineComponent({
  name: "SupportoView",
  components: { NavBarVue },
  props: {
    msg: String,
  },
  data() {
    return {
      isOpen:false,
      msg_txt:'',
      chat:{},
      utente:{},
      open_chats:[]
      } 
  },
  methods: {
    async send_message(){
      if(!this.msg_txt) return
      const token = sessionStorage.getItem("token")
      const opzioniRichiesta={
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-access-token":token
        },
        body:JSON.stringify({testo:this.msg_txt})
      }

      try {
        const res = await fetch(`${process.env.VUE_APP_ROOT_API}/chat/${this.chat._id}/send_message`,opzioniRichiesta)
        if(!res.ok) throw new Error("error")
        const data = await res.json()
        if(!data.successful) throw new Error("error")
      } catch (error) {
        alert("Impossibile inviare il messaggio")
      }finally{
        this.msg_txt=''
      }
    },
    async open_new_chat(){
      const token = sessionStorage.getItem("token")
      const opzioniRichiesta= {
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "x-access-token":token
        }
      }
      try {
        const res = await fetch(`${process.env.VUE_APP_ROOT_API}/chat/nuova_chat`,opzioniRichiesta)
        if(!res.ok){
          throw new Error("Errore")
        }
        const data = await res.json()
        if(data.successful){
          this.isOpen=true
          this.chat=data.chat
          console.log(data.chat)
        }
      } catch (error) {
        alert("Impossibile aprire la chat")
      }
    },
    async get_unread(){
      const token = sessionStorage.getItem("token")
      const opzioniRichiesta={
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "x-access-token":token
        }
      }
      try {
        const res = await fetch(`${process.env.VUE_APP_ROOT_API}/chat/${this.chat._id}/unread`,opzioniRichiesta)
        if(!res.ok){
          throw new Error("Errore")
        }
        const data = await res.json()
        console.log(data)
        if(data.successful){ //mettere apposto
          this.chat=data.chat?data.chat:{}
        }
      } catch (error) {
        alert("Errore nel recupero messaggi")
      }
    },
    async get_all(){
      const token = sessionStorage.getItem("token")
      const opzioniRichiesta={
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "x-access-token":token
        }
      }
      try {
        const res = await fetch(`${process.env.VUE_APP_ROOT_API}/chat/${this.chat._id}/all`,opzioniRichiesta)
        if(!res.ok) throw new Error("error")
        const data = await res.json()
        if(data.successful){
          this.chat=data.chat
        }
      } catch (error) {
        alert("Impossibile recuperare i messaggi")
      }
    }
  },
  async mounted() {
    socket.on('message',this.get_all)
    const token = sessionStorage.getItem("token");
    console.log(token)
    const opzioniRichiesta={
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        "x-access-token":token
      }
    }
    try {
      const res = await fetch(`${process.env.VUE_APP_ROOT_API}/il_mio_profilo`,opzioniRichiesta)
      if(!res.ok) throw new Error("error")
      const data = await res.json()
      if(data.successful) this.utente = data["profile"]
      console.log(this.utente)
      await get_open_chats()
    } catch (error) {
      alert("Errore nel caricamento della pagina")
    }
  },
  async get_open_chats(){
    const token = sessionStorage.getItem("token")
    const opzioniRichiesta={
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "x-access-token":token
      }
    }
    try {
      const res= await fetch(`${process.env.VUE_APP_ROOT_API}/chat/get_open`,opzioniRichiesta)
      const data = await res2.json()
      if(data.successful) this.open_chats=data["chat_ids"]
      console.log(data)
    } catch (error) {
      alert("Impossibile recuperare le chat aperte")
    }
  }
});
</script> 
<style>


.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
/*   border: 1px solid #ccc; */
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: .5em;
/*   margin-bottom: .5em; */
  font-size: .8em;
}
.message-out {
  background: #407FFF;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #F1F0F0;
  color: black;
}
.chat-inputs {
/*   border: 1px solid #ccc; */
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 2em auto;
}
#person1-input {
  padding: .5em;
}
#person2-input {
  padding: .5em;  
}

</style>