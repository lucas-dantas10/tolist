import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import store from './store';

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoClock, BiPlusCircle, BiArrowRight, BiArrowDown, 
    BiCircle, BiCheck2Circle, BiArrowDownUp, BiArrowUp } 
from "oh-vue-icons/icons";

addIcons(
    CoClock, BiPlusCircle, BiArrowRight, BiArrowDown,BiArrowUp,
    BiCircle, BiCheck2Circle, BiArrowDownUp
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app
.use(store)
.use(router)
.mount('#app');
