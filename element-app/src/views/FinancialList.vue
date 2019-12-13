<template>
  <div class="fillContainer">
    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      max-height="450"
      border
      fit=""
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" align="center" width="50">
      </el-table-column>

      <el-table-column prop="date" label="日期" align="center">
        <!-- 添加小图标 -->
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="收支类型" align="center">
      </el-table-column>

      <el-table-column prop="desc" label="收支描述" align="center">
      </el-table-column>

      <el-table-column prop="income" label="收入" align="center">
        <template slot-scope="scope">
          <span style="color:#00d053">{{ scope.row.income }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="expend" label="支出" align="center">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="cash" label="现金账户" align="center">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注" align="center">
      </el-table-column>

      <el-table-column label="操作" prop="operation" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="warning"
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      // 获取表格数据
      const result = await this.$axios.get("api/profits/");
      // console.log(result.data)
      const { data, code } = result.data;
      if (code == 1) {
        this.tableData = data;
      } else {
        this.$message.error("返回错误");
      }
    }
  }
};
</script>

<style scoped>
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box
}
</style>
