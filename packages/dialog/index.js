import RDailog from './src/main.vue';

/* istanbul ignore next */
RDailog.install = function (Vue) {
    Vue.component(RDailog.name, RDailog);
};

export default RDailog;
