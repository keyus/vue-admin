import Vue from 'vue';
import ElementUI from 'element-ui'
import leftbar from './leftbar/index';
import sitemenu from './sitemenu/index';

const components = [
    leftbar,
    sitemenu,
];

const install = function(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    })
};

install(Vue);
Vue.use(ElementUI);

export default Vue;