import RPagination from './src/main.vue';

/* istanbul ignore next */
RPagination.install = function (Vue) {
    Vue.component(RPagination.name, RPagination);
};

export default RPagination;
