import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import './plugins/axios'

library.add(faTrash, faPen);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');