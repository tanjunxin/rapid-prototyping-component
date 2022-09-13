<template>
  <el-table
    ref="ybTable"
    style="width: 100%"
    v-bind="$attrs"
    v-on="$listeners"
    v-loading="loading"
    :data="tableData"
    :height="$attrs.height ? $attrs.height : '100%'"
    :stripe="$attrs.stripe ? $attrs.stripe : true"
    :border="$attrs.border ? $attrs.border : true"
    :size="$attrs.size ? $attrs.size : 'small'"
    :highlight-current-row="
      $attrs.highlightCurrentRow ? $attrs.highlightCurrentRow : false
    "
  >
    <template v-for="(item, index) in tableConfig">
      <!-- 内置按钮渲染 -->
      <el-table-column
        v-if="item.operation"
        :key="index"
        v-bind="item"
        :label="item.label ? item.label : '操作'"
        :header-align="item.headerAlign ? item.headerAlign : 'center'"
        :align="item.align ? item.align : 'center'"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(v, i) in item.operation"
            :key="i"
            :type="v.type ? v.type : 'text'"
            :size="v.size ? v.size : 'small'"
            :disabled="v.disabled ? v.disabled : false"
            @click="handleBtn(v.text, scope.row, scope.$index)"
            >{{ v.text }}</el-button
          >
        </template>
      </el-table-column>
      <!-- 自定义内容渲染 -->
      <el-table-column
        v-else-if="item.renderFn"
        :key="index"
        v-bind="item"
        :header-align="item.headerAlign ? item.headerAlign : 'center'"
        :align="item.align ? item.align : 'center'"
      >
        <template v-slot="scope">
          <!-- 使用函数式组件进行dom渲染 -->
          <render-dom
            :render="() => item.renderFn.render(scope.row, scope.$index)"
          ></render-dom>
        </template>
      </el-table-column>
      <!-- 普通渲染 -->
      <el-table-column
        v-else
        :key="index"
        v-bind="item"
        :header-align="item.headerAlign ? item.headerAlign : 'center'"
        :align="item.align ? item.align : 'center'"
      >
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
export default {
  name: "RTable",
  components: {
    renderDom: {
      functional: true,
      props: {
        render: Function,
      },
      render(createElement, renDom) {
        return renDom.props.render();
      },
    },
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => [{}],
    },
    tableConfig: {
      type: Array,
      default: () => [{}],
    },
  },
  methods: {
    handleBtn(type, row, index) {
      console.log(type, row, index);
      switch (type) {
        case "详情":
          this.handleDetail(row, index);
          break;
        case "编辑":
          this.handleEdit(row, index);
          break;
        case "删除":
          this.handleDelete(row, index);
          break;
        default:
          break;
      }
    },
    handleDetail(row, index) {
      this.$emit("detail-click", row, index);
    },
    handleEdit(row, index) {
      this.$emit("edit-click", row, index);
    },
    handleDelete(row, index) {
      this.$emit("delete-click", row, index);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>