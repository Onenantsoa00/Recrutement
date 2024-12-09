/* import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route/TheRouter.js'
import {createPinia} from 'pinia'
import './assets/css/app.css'

const pinia = createPinia();

const app = createApp(App).use(pinia).use(router)
    app.mount('#app')
 */


/* import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route/TheRouter.js'
import {createPinia} from 'pinia'

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
 */

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './route/TheRouter.js';
import { createPinia } from 'pinia';
import './assets/css/app.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
