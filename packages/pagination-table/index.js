import RPaginationTable from './src/main.vue';

/* istanbul ignore next */
RPaginationTable.install = function (Vue) {
    Vue.component(RPaginationTable.name, RPaginationTable);
};

export default RPaginationTable;
