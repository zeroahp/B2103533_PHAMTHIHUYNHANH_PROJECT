import { createApp} from 'vue'
import {createWebHistory, createRouter} from 'vue-router'
import App from './App.vue'

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
//fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

//route
import router from './router';

//css
import './assets/main.css'
import './assets/style.css'

const app = createApp(App);


app.use(router).mount('#app'); 

