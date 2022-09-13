<template>
  <div :class="['inline-form-component', { 'left-right-layout': layout }]">
    <!-- 条件区域 -->
    <el-row
      :type="rowConfig.type ? rowConfig.type : ''"
      :justify="rowConfig.justify ? rowConfig.justify : 'start'"
      :align="rowConfig.align ? rowConfig.align : ''"
      :gutter="rowConfig.gutter ? rowConfig.gutter : 10"
    >
      <el-form
        ref="inlineForm"
        :inline="true"
        :model="formInline"
        v-bind="$attrs"
        v-on="$listeners"
        :style="`width: ${formWidth}`"
        :label-width="$attrs.labelWidth ? $attrs.labelWidth : '100px'"
        :size="$attrs.size ? $attrs.size : 'small'"
      >
        <!-- input 输入框 -->
        <el-col
          :span="item.span ? item.span : 8"
          :offset="rowConfig.offset ? item.offset : 0"
          :push="item.push ? item.push : 0"
          :pull="item.pull ? item.pull : 0"
          :class="item.className ? item.className : ''"
          :key="index"
          v-for="(item, index) in defaultFormConfig"
        >
          <el-form-item
            v-bind="item"
            :style="`width: 100%`"
            v-if="item.type === 'input'"
          >
            <el-input
              v-model="formInline[item.value]"
              v-bind="item.config"
              :style="`width: ${item.style ? item.style : '100%'}`"
              :placeholder="
                item.config && item.config.placeholder
                  ? item.config.placeholder
                  : `请输入${item.label}`
              "
              @blur="handleInputBlur"
              @focus="handleInputFocus"
              @change="handleInputChange"
              @input="handleInputs"
              @clear="handleInputClear"
            ></el-input>
          </el-form-item>
          <!-- select 选择器 -->
          <el-form-item
            v-bind="item"
            :style="`width: 100%`"
            v-if="item.type === 'select'"
          >
            <el-select
              v-model="formInline[item.value]"
              v-bind="item.config"
              :style="`width: ${item.style ? item.style : '100%'}`"
              :placeholder="
                item.config && item.config.placeholder
                  ? item.config.placeholder
                  : `请选择${item.label}`
              "
              @change="handleSelectChange"
              @visible-change="handleSelectVisibleChange"
              @remove-tag="handleSelectRemoveTag"
              @clear="handleSelectClear"
              @blur="handleSelectBlur"
              @focus="handleSelectFocus"
            >
              <el-option
                v-for="(v, k) in item.config.options"
                :key="k"
                :label="v.label"
                :value="v.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- cascader 级联选择器 -->
          <el-form-item
            v-bind="item"
            :style="`width: 100%`"
            v-if="item.type === 'cascader'"
          >
            <el-cascader
              v-model="formInline[item.value]"
              v-bind="item.config"
              :style="`width: ${item.style ? item.style : '100%'}`"
              :placeholder="
                item.config && item.config.placeholder
                  ? item.config.placeholder
                  : `请选择${item.label}`
              "
              @change="handleCascaderChange"
              @expand-change="handleCascaderExpandChange"
              @blur="handleCascaderBlur"
              @focus="handleCascaderFocus"
              @visible-change="handleCascaderVisibleChange"
              @remove-tag="handleCascaderRemoveTag"
            ></el-cascader>
          </el-form-item>
          <!-- timePicker 时间选择器 -->
          <el-form-item
            v-bind="item"
            :style="`width: 100%`"
            v-if="item.type === 'timePicker'"
          >
            <el-time-picker
              v-model="formInline[item.value]"
              v-bind="item.config"
              :style="`width: ${item.style ? item.style : '100%'}`"
              is-range
              :range-separator="
                item.config && item.config.rangeSeparator
                  ? item.config && item.config.rangeSeparator
                  : '至'
              "
              :start-placeholder="
                item.config && item.config.startPlaceholder
                  ? item.config && item.config.startPlaceholder
                  : '开始时间'
              "
              :end-placeholder="
                item.config && item.config.endPlaceholder
                  ? item.config && item.config.endPlaceholder
                  : '结束时间'
              "
              :placeholder="
                item.config && item.config.placeholder
                  ? item.config.placeholder
                  : `请选择${item.label}`
              "
              @change="handleTimePickerChange"
              @blur="handleTimePickerBlur"
              @focus="handleTimePickerFocus"
            >
            </el-time-picker>
          </el-form-item>
          <!-- datePicker 日期选择器 -->
          <el-form-item
            v-bind="item"
            :style="`width: 100%`"
            v-if="item.type === 'datePicker'"
          >
            <el-date-picker
              v-model="formInline[item.value]"
              v-bind="item.config"
              :style="`width: ${item.style ? item.style : '100%'}`"
              :type="
                item.config && item.config.type
                  ? item.config && item.config.type
                  : 'datetimerange'
              "
              :range-separator="
                item.config && item.config.rangeSeparator
                  ? item.config && item.config.rangeSeparator
                  : '至'
              "
              :start-placeholder="
                item.config && item.config.startPlaceholder
                  ? item.config && item.config.startPlaceholder
                  : '开始时间'
              "
              :end-placeholder="
                item.config && item.config.endPlaceholder
                  ? item.config && item.config.endPlaceholder
                  : '结束时间'
              "
              :placeholder="
                item.config && item.config.placeholder
                  ? item.config.placeholder
                  : `请选择${item.label}`
              "
              :default-value="timeDefaultShow"
              :picker-options="
                item.config && item.config.pickerOptions
                  ? item.config.pickerOptions
                  : pickerOptions
              "
              @change="handleDatePickerChange"
              @blur="handleDatePickerBlur"
              @focus="handleDatePickerFocus"
            >
            </el-date-picker>
          </el-form-item>
          <!-- slot 自定义 -->
          <el-form-item
            v-bind="item"
            :style="`width: 100%`"
            v-if="item.type === 'formSlot'"
          >
            <slot :name="item.slotName" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 按钮区域 -->
    <div
      :class="[layout ? 'inline-form-btn' : 'inline-form-btn-layout']"
      v-if="!btnConfig.isSearch || !btnConfig.isReset"
    >
      <el-button
        :type="btnConfig.searchType ? btnConfig.searchType : 'primary'"
        :size="btnConfig.size ? btnConfig.size : 'small'"
        @click="onSubmit"
        v-if="!btnConfig.isSearch"
        >{{ btnConfig.searchText ? btnConfig.searchText : "查询" }}</el-button
      >
      <el-button
        :type="btnConfig.resetType ? btnConfig.resetType : ''"
        :size="btnConfig.size ? btnConfig.size : 'small'"
        @click="onReset"
        v-if="!btnConfig.isReset"
        >{{ btnConfig.resetText ? btnConfig.resetText : "重置" }}</el-button
      >
      <el-button
        type="text"
        :size="btnConfig.size ? btnConfig.size : 'small'"
        @click="hideOverFlow"
        v-if="isNeedHide"
        >{{ toggle ? "收起" : "展开"
        }}<i
          :class="[
            toggle
              ? 'el-icon-arrow-up el-icon--up'
              : 'el-icon-arrow-down el-icon--down',
          ]"
      /></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RInlineForm",
  props: {
    layout: {
      type: [String, Boolean, Number],
      default: true,
    },
    rowConfig: {
      type: Object,
      default: () => ({}),
    },
    formWidth: {
      type: String,
      default: "100%",
    },
    formInline: {
      type: Object,
      default: () => ({}),
    },
    formConfig: {
      type: Array,
      default: () => [],
    },
    btnConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      timeDefaultShow: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      toggle: false,
      flag: 0,
      defaultFormConfig: [],
    };
  },
  computed: {
    isNeedHide() {
      let len = 0;
      this.formConfig.find((item, index) => {
        len += item.span ? item.span : 8;
        if (len > 24) {
          this.flag = index - 1;
          this.toggle = true;
        }
      });
      return len / 24 > 2 && this.layout;
    },
  },
  watch: {
    toggle(newValue, oldValue) {
      if (newValue) {
        this.defaultFormConfig = this.formConfig;
      } else {
        this.defaultFormConfig = this.formConfig.slice(0, this.flag);
      }
    },
  },
  created() {
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth());
  },
  methods: {
    handleInputBlur(event) {
      console.log(event);
      this.$emit("input-blur", event);
    },
    handleInputFocus(event) {
      console.log(event);
      this.$emit("input-focus", event);
    },
    handleInputChange(val) {
      console.log(val);
      this.$emit("input-change", val);
    },
    handleInputs(val) {
      console.log(val);
      this.$emit("input-s", val);
    },
    handleInputClear() {
      this.$emit("input-clear", true);
    },
    handleSelectChange(value) {
      console.log(value);
      this.$emit("select-change", value);
    },
    handleSelectVisibleChange(flag) {
      console.log(flag);
      this.$emit("select-visible-change", flag);
    },
    handleSelectRemoveTag(value) {
      console.log(value);
      this.$emit("select-remove-tag", value);
    },
    handleSelectClear() {
      this.$emit("select-clear", true);
    },
    handleSelectBlur(event) {
      console.log(event);
      this.$emit("select-blur", event);
    },
    handleSelectFocus(event) {
      console.log(event);
      this.$emit("select-focus", event);
    },
    handleCascaderChange(value) {
      console.log(value);
      this.$emit("cascader-change", value);
    },
    handleCascaderExpandChange(arr) {
      console.log(arr);
      this.$emit("cascader-expand-change", arr);
    },
    handleCascaderBlur(event) {
      console.log(event);
      this.$emit("cascader-blur", event);
    },
    handleCascaderFocus(event) {
      console.log(event);
      this.$emit("cascader-focus", event);
    },
    handleCascaderVisibleChange(flag) {
      console.log(flag);
      this.$emit("cascader-visible-change", flag);
    },
    handleCascaderRemoveTag(value) {
      console.log(value);
      this.$emit("cascader-remove-tag", value);
    },
    handleTimePickerChange(value) {
      console.log(value);
      this.$emit("time-picker-change", value);
    },
    handleTimePickerBlur(instance) {
      console.log(instance);
      this.$emit("time-picker-blur", instance);
    },
    handleTimePickerFocus(instance) {
      console.log(instance);
      this.$emit("time-picker-focus", instance);
    },
    handleDatePickerChange(value) {
      console.log(value);
      this.$emit("date-picker-change", value);
    },
    handleDatePickerBlur(instance) {
      console.log(instance);
      this.$emit("date-picker-blur", instance);
    },
    handleDatePickerFocus(instance) {
      console.log(instance);
      this.$emit("date-picker-focus", instance);
    },
    onSubmit() {
      if (!this.toggle) {
        for (let i = this.flag; i < this.formConfig.length; i++) {
          this.formInline[this.formConfig[i]["value"]] = "";
        }
      }
      this.$emit("onSubmit", this.formInline);
    },
    onReset() {
      this.$refs["inlineForm"].resetFields();
      this.$emit("onReset", this.formInline);
    },
    hideOverFlow() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-form-component {
  :deep(.el-form-item) {
    display: flex;
    justify-content: flex-start;
    .el-form-item__label {
      white-space: nowrap;
    }
    .el-form-item__content {
      width: 100%;
    }
  }
  .inline-form-btn {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
    margin-left: 24px;
  }
  .inline-form-btn-layout {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-left: 24px;
  }
}
.left-right-layout {
  display: flex;
}
</style>