import Vue from 'vue'
import Dialog from './dialog/index.js'
import Form from './form/index.js'
import InlineForm from './inline-form/index.js'
import Pagination from './pagination/index.js'
import PaginationTable from './pagination-table/index.js'
import Table from './table/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

const components = [
  Dialog,
  Form,
  InlineForm,
  Pagination,
  PaginationTable,
  Table
]
const install = function () {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  version: '1.0.0',
  install: install,
}

export {
  Dialog,
  Form,
  InlineForm,
  Pagination,
  PaginationTable,
  Table
}