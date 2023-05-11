import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "./login.vue";

const routes = [
    { 
        path: '/', 
        component: LoginPage
    },
    
];

export default const Router = createRouter({
    history: createWebHashHistory(),
    routes,
});

