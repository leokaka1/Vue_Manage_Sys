<template>
  <div>
    <el-row gutter="40">
      <el-col :span="6">
        <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        >
        <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!-- 按钮区域 -->
      <el-col :span="6">
        <el-button type="primary" >添加用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
