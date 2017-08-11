import Vue from './components/vue.components';
import App from './app.vue';
import store from './store/index';
import router from './router/index';
import Api from './api/index';
import './sass/common.scss'
import 'element-ui/lib/theme-default/index.css';

Vue.prototype.api   = Api;
const app = new Vue({
    store,
    router,
    render : (h)=> h(App),
});
app.$mount('#app');


