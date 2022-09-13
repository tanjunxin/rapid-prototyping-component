<template>
  <el-row
    :type="rowConfig.type ? rowConfig.type : ''"
    :justify="rowConfig.justify ? rowConfig.justify : 'start'"
    :align="rowConfig.align ? rowConfig.align : ''"
    :gutter="rowConfig.gutter ? rowConfig.gutter : 0"
  >
    <el-form
      ref="ybForm"
      v-bind="$attrs"
      v-on="$listeners"
      :style="`width: ${formWidth}`"
      :model="formData"
      :label-width="$attrs.labelWidth ? $attrs.labelWidth : '100px'"
      :size="$attrs.size ? $attrs.size : 'small'"
    >
      <el-col
        :span="rowConfig.span ? rowConfig.span : 24"
        :offset="rowConfig.offset ? rowConfig.offset : 0"
        :push="rowConfig.push ? rowConfig.push : 0"
        :pull="rowConfig.pull ? rowConfig.pull : 0"
        v-for="(item, index) in formConfig"
        :key="index"
      >
        <!-- radio 单选框 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'radio'"
        >
          <el-radio-group
            v-model="formData[item.value]"
            v-bind="item.config"
            @change="handleRadioChange"
          >
            <el-radio
              v-for="(v, k) in item.config.radioCofig"
              :key="k"
              v-bind="v"
              @change="handleRadioGroupChange"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- radio 单选框按钮样式 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'radioBtn'"
        >
          <el-radio-group
            v-model="formData[item.value]"
            v-bind="item.config"
            @change="handleRadioChange"
          >
            <el-radio-button
              v-for="(v, k) in item.config.radioCofig"
              :key="k"
              v-bind="v"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- checkbox 多选框 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'check'"
        >
          <el-checkbox-group
            v-model="formData[item.value]"
            @change="handleCheckGroupChange"
          >
            <el-checkbox
              v-for="(v, k) in item.config.checkCofig"
              :key="k"
              v-bind="v"
              @change="handleCheckChange"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- checkbox 多选框按钮样式 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'checkBtn'"
        >
          <el-checkbox-group
            v-model="formData[item.value]"
            @change="handleCheckGroupChange"
          >
            <el-checkbox-button
              v-for="(v, k) in item.config.checkBtnCofig"
              :key="k"
              v-bind="v"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <!-- input 输入框 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'input'"
        >
          <el-input
            v-model="formData[item.value]"
            v-bind="item.config"
            :style="`width: ${item.style ? item.style : '380px'}`"
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
        <!-- inputNumber 计数器 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'inputNumber'"
        >
          <el-input-number
            v-model="formData[item.value]"
            v-bind="item.config"
            @change="handleInputNumberChange"
            @blur="handleInputNumberBlur"
            @focus="handleInputNumberFocus"
          ></el-input-number>
        </el-form-item>
        <!-- select 选择器 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'select'"
        >
          <el-select
            v-model="formData[item.value]"
            v-bind="item.config"
            :style="`width: ${item.style ? item.style : '380px'}`"
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
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'cascader'"
        >
          <el-cascader
            v-model="formData[item.value]"
            v-bind="item.config"
            :style="`width: ${item.style ? item.style : '380px'}`"
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
        <!-- switch 开关 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'switch'"
        >
          <el-switch
            v-model="formData[item.value]"
            v-bind="item.config"
            @change="handleSwitchChange"
          >
          </el-switch>
        </el-form-item>
        <!-- timePicker 时间选择器 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'timePicker'"
        >
          <el-time-picker
            v-model="formData[item.value]"
            v-bind="item.config"
            :style="`width: ${item.style ? item.style : '380px'}`"
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
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'datePicker'"
        >
          <el-date-picker
            v-model="formData[item.value]"
            v-bind="item.config"
            :style="`width: ${item.style ? item.style : '380px'}`"
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
        <!-- button 按钮 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : 'form-item-button'"
          :style="`width: 100%`"
          v-if="item.type === 'formButton'"
        >
          <el-button
            v-bind="item.config"
            :type="
              item.config && item.config.submitType
                ? item.config.submitType
                : 'primary'
            "
            @click="handleButtonSumbit"
          >
            {{
              item.config && item.config.submitText
                ? item.config.submitText
                : "确定"
            }}
          </el-button>
          <el-button
            v-bind="item.config"
            :type="
              item.config && item.config.resetType ? item.config.resetType : ''
            "
            @click="handleButtonReset"
          >
            {{
              item.config && item.config.resetText
                ? item.config.resetText
                : "取消"
            }}
          </el-button>
        </el-form-item>
        <!-- slot 自定义 -->
        <el-form-item
          v-bind="item"
          :class="item.className ? item.className : ''"
          :style="`width: 100%`"
          v-if="item.type === 'formSlot'"
        >
          <slot :name="item.slotName" />
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: "RForm",
  props: {
    rowConfig: {
      type: Object,
      default: () => ({}),
    },
    formWidth: {
      type: String,
      default: "100%",
    },
    formConfig: {
      type: Array,
      default: () => [],
    },
    formData: {
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
    };
  },
  created() {
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth());
  },
  methods: {
    handleRadioChange(val) {
      console.log(val);
      this.$emit("radio-change", val);
    },
    handleRadioGroupChange(val) {
      console.log(val);
      this.$emit("radio-group-change", val);
    },
    handleCheckChange(val) {
      console.log(val);
      this.$emit("check-change", val);
    },
    handleCheckGroupChange(val) {
      console.log(val);
      this.$emit("check-group-change", val);
    },
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
    handleInputNumberChange(currentValue, oldValue) {
      console.log(currentValue, oldValue);
      this.$emit("input-number-change", currentValue, oldValue);
    },
    handleInputNumberBlur(event) {
      console.log(event);
      this.$emit("input-s", event);
    },
    handleInputNumberFocus(event) {
      console.log(event);
      this.$emit("input-number-focus", event);
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
    handleSwitchChange(value) {
      console.log(value);
      this.$emit("switch-change", value);
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
    handleButtonSumbit() {
      this.$refs["ybForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$emit("form-submit", this.formData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleButtonReset() {
      this.$refs["ybForm"].resetFields();
      this.$emit("form-cannel", true);
    },
  },
};
</script>

<style lang='scss' scoped>
:deep(.el-form) {
  .el-form-item {
    display: flex;
    align-items: center;
    .el-form-item__content {
      margin-left: 8px !important;
      display: flex;
      justify-content: flex-start;
    }
  }
  .form-item-button {
    justify-content: center;
  }
}
</style>