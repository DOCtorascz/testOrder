import { createApp } from 'vue'
import store from './store'
import './assets/style/css/output.css'
import App from './App.vue'

const app = createApp(App);
app.use(store);
app.mount('#app');
