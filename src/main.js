import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import store from './store';
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
    CoClock, BiPlusCircle, BiArrowRight, BiArrowDown, 
    BiCircle, BiCheck2Circle, BiArrowDownUp, BiArrowUp, FaTasks, LaClipboardListSolid,
    BiListStars, RiSettings4Line, BiArrowBarLeft, BiThreeDots, IoCloseOutline, MdCancelOutlined, BiSunFill, BiMoonFill
} 
from "oh-vue-icons/icons";

addIcons(
    CoClock, BiPlusCircle, BiArrowRight, BiArrowDown,BiArrowUp,
    BiCircle, BiCheck2Circle, BiArrowDownUp, FaTasks, LaClipboardListSolid,
    BiListStars, RiSettings4Line, BiArrowBarLeft, BiThreeDots, IoCloseOutline, MdCancelOutlined, BiSunFill, BiMoonFill
);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.component('PacmanLoader', PacmanLoader);

app
.use(store)
.use(router)
.mount('#app');
