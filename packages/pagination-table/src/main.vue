<template>
  <div class="pagination-table-component">
    <div class="pagination-table-slot">
      <slot></slot>
    </div>
    <r-table v-bind="$attrs" v-on="$listeners" />
    <r-pagination v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import RTable from "../../table/src/main.vue";
import RPagination from "../../pagination/src/main.vue";

export default {
  name: "RPaginationTable",
  components: {
    RTable,
    RPagination,
  },
};
</script>

<style lang="scss" scoped>
.pagination-table-component {
  :deep(.el-pagination) {
    margin-top: 16px;
    margin-right: 48px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>