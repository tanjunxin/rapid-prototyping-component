<template>
  <div id="app">
    <!-- <r-table :tableConfig="tableConfig" :tableData="tableData"></r-table> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // tableConfig: [
      //   { prop: "date", label: "日期" },
      //   { prop: "name", label: "姓名" },
      //   { prop: "address", label: "地址" },
      // ],
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄",
      //   },
      // ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
