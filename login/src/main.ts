import { createApp } from 'vue';
import App from './App.vue';
import Router from "./Router.ts";

// createApp(App).mount('#app')
const app = createApp({});
app.use(Router);


