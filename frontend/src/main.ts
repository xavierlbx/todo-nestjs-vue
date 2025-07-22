import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from '../router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(Toast, {
    position: POSITION.TOP_CENTER
});
app.use(pinia);
app.use(router);
app.mount('#app');
