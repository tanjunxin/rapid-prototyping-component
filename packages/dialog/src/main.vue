<template>
  <el-dialog
    ref="ybDialog"
    v-bind="$attrs"
    v-on="$listeners"
    :title="$attrs.title ? $attrs.title : '提示'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    :width="$attrs.width ? $attrs.width : '80%'"
    center
    :close-on-click-modal="
      $attrs.closeOnClickModal ? $attrs.closeOnClickModal : false
    "
  >
    <template slot="title">
      <slot name="title" />
    </template>
    <slot name="body" />
    <span slot="footer" class="dialog-footer" v-if="isFooter">
      <el-button
        :type="footerConfig.cannelType ? footerConfig.cannelType : ''"
        :size="footerConfig.cannelSize ? footerConfig.cannelSize : 'small'"
        @click="handleCannel"
        >{{
          footerConfig.cannelText ? footerConfig.cannelText : "取 消"
        }}</el-button
      >
      <el-button
        :type="footerConfig.confirmType ? footerConfig.confirmType : 'primary'"
        :size="footerConfig.confirmSize ? footerConfig.confirmSize : 'small'"
        @click="handleConfirm"
        >{{
          footerConfig.confirmText ? footerConfig.confirmText : "确 定"
        }}</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "RDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isFooter: {
      type: Boolean,
      default: false,
    },
    footerConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    visible: {
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    changeVisible(item) {
      this.$emit("changeVisible", item);
    },
    handleClose(done) {
      this.changeVisible();
      done();
    },
    handleCannel() {
      this.changeVisible();
    },
    handleConfirm() {
      this.changeVisible();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>