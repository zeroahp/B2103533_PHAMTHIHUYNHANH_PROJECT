import { createApp} from 'vue'
import App from './App.vue'

//vuex
import store from './store';

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

app.use(router);
app.use(store);
app.mount('#app'); 
// app.use(router).mount('#app'); 

