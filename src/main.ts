import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import mitt from 'mitt';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  RiDashboardLine, RiScales3Line, OiLightBulb, HiCurrencyDollar, RiPieChartLine, RiLeafLine,
  IoPrismSharp, IoDocument, BiQuestionCircle, BiFileEarmarkLock, BiEye, PrAngleDoubleLeft,
  PrAngleDoubleRight, PrChevronLeft, PrChevronRight, MdFiledownloadOutlined
} from 'oh-vue-icons/icons';

import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';

import App from './App.vue';
import router from './router';
import '@styles/tailwindcss.css';

import AtomButton from '@components/Atoms/AtomButton';
import AtomIcon from '@components/Atoms/AtomIcon';
import AtomLoaderSpiner from '@components/Atoms/AtomLoaderSpiner';

import MoleculeBreadcrumbs from '@components/Molecules/MoleculeBreadcrumbs';
import MoleculeTitlePageActionTop from '@components/Molecules/MoleculeTitlePageActionTop';

/** 
 * Initialize Create app
 * */
const app = createApp(App);

/** 
 * Event Bus Emitter 
 * */
const emitter = mitt();
app.provide('$emitter', emitter);

/** 
 * Pinia State Management 
 * */
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

/** 
 * Vue Router
 * */
app.use(router);

/**
 * Oh Vue Icons
 * */
addIcons(
  RiDashboardLine, RiScales3Line, OiLightBulb, HiCurrencyDollar, RiPieChartLine, RiLeafLine,
  IoPrismSharp, IoDocument, BiQuestionCircle, BiFileEarmarkLock, BiEye, PrAngleDoubleLeft,
  PrAngleDoubleRight, PrChevronLeft, PrChevronRight, MdFiledownloadOutlined
);

/**
 * DataTable
 */
app.use(PrimeVue, {
  theme: 'none'
});
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Paginator', Paginator);

app.component('v-icon', OhVueIcon);

/**
 * Global Components
 */
app.component('AtomButton', AtomButton);
app.component('AtomIcon', AtomIcon);
app.component('AtomLoaderSpiner', AtomLoaderSpiner);
app.component('MoleculeBreadcrumbs', MoleculeBreadcrumbs);
app.component('MoleculeTitlePageActionTop', MoleculeTitlePageActionTop);

/** 
 * Mount App
 * */
app.mount('#app');
