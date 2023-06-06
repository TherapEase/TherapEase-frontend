
<template>
      <div>
        <NavBarVue />

      </div>
      <h1>Supporto tecnico</h1>
      <h1 class="headline">Vue.js Chat Box</h1>
      <!--Inizio area chat-->
      <main id="app">
        <section ref="chatArea" class="chat-area">
          <p v-for="message in this.chat.messaggi" :key="message.id" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
            {{ message.body }}
          </p>
        </section>

        <section class="chat-inputs"> <!--non so come far apparire o uno o l'altro-->
          <button @click="open_chat">Apri una nuova chat</button>
          <button @click="get_unread">Refresh</button>
          <form @submit.prevent="sendMessage('out')" id="person2-form">
            <label for="person2-input">You</label>
            <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message">
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      <!--Fine area chat-->

</template>


<script>
import { defineComponent } from "vue";
import NavBarVue from "@/components/NavBar.vue";


//<label for="age">Input your age (years): <input id="age" type="number" name="age" min="13" max="120" /></label>

export default defineComponent({
  name: "SupportoView",
  components: { NavBarVue },
  props: {
    msg: String,
  },
  data() {
    return {
      bobMessage: '',
      youMessage: '',
      aperta:false,
      chat:{},
      messages: [
        // {
        //   id:1,
        //   body: 'Welcome to the chat, I\'m Bob!',
        //   author: 'bob'
        // },
        // {
        //   id:2,
        //  body: 'Thank you Bob',
        //  author: 'you'
        // },
        // {
        //   id:3,
        // body: 'You\'re most welcome',
        // author: 'bob'
        // }
      ]}   
  },
  methods: {
    sendMessage(direction) {
      if (!this.youMessage && !this.bobMessage) {
        return
      }
      if (direction === 'out') {
        this.messages.push({body: this.youMessage, author: 'you'})
        this.youMessage = ''
      } else if (direction === 'in') {
        this.messages.push({body: this.bobMessage, author: 'bob'})
        this.bobMessage = ''
      } else {
        alert('something went wrong')
      }
      // app.nextTick(() => {
      //   let messageDisplay = this.$refs.chatArea
      //   messageDisplay.scrollTop = messageDisplay.scrollHeight
      // })
    },

    async open_chat(){
      console.log("okok")
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
          this.chat=data.chat
          console.log(data.chat)
        }
      } catch (error) {
        alert(error)
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
        if(data.successful){
          this.chat=data.chat
        }
      } catch (error) {
        alert(error)
      }
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