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

    <!-- 表格 -->
    <el-table :data="users" border stripe show-header>
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
      <el-table-column label="角色" prop="identity" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
          <template slot-scope="scope">
              <!-- 是否启动状态 -->
              <el-switch v-model="scope.row.access" @change="changeUserState(scope.row)"></el-switch>
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
          <el-button type="warning" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-setting"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    created() {
        this.getUserInfo()
    },
    data() {
        return {
            users:[]
        }
    },
    methods: {
        async getUserInfo(){
            const result = await this.$axios.get('api/users/getUsers')
            // console.log(result.data.result)  
            if(result.data.code == 1){
                this.users = result.data.result
            }
        },
        // 改变用户的状态，是否启用
        async changeUserState(row){
            console.log(row)
            const result = await this.$axios.post(`api/users/changeUserState/${row._id}`,{access:row.access})
            console.log(result)
            if(result.data.code == 1){
                this.$message({
                    message:"用户状态已改变!",
                    type:"success"
                })
            }

        }
    },
};
</script>

<style lang="scss" scoped>
.el-table{
    margin-top: 15px
}
</style>
