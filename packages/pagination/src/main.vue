<template>
  <el-pagination
    ref="ybPagination"
    v-bind="$attrs"
    v-on="$listeners"
    :background="$attrs.background ? false : true"
    :layout="
      $attrs.layout ? $attrs.layout : 'total, sizes, prev, pager, next, jumper'
    "
    :page-sizes="$attrs.pageSizes ? $attrs.pageSizes : [10, 20, 50, 100]"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "RPagination",
  props: {},
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-pagination {
}
</style>
