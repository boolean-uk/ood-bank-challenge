import { createApp } from 'vue';
import './style.css'
// @ts-ignore
import App from './App.vue';
import { createPinia } from 'pinia';

createApp(App).use(createPinia()).mount('#app');