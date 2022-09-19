import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@/styl/screen.styl';
import {createApp} from 'vue';
import App from './app.vue';

const app = createApp({
  ...App,
});
app.mount('#app');
