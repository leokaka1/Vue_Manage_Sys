<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="6">
        <el-input
          placeholder="请输入对应的用户名"
          class="input-with-select"
          v-model="query"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser"
          ></el-button>
        </el-input>
      </el-col>
      <!-- 按钮区域 -->
      <el-col :span="6">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="
        users.slice(
          (pagenations.page_index - 1) * pagenations.page_size,
          pagenations.page_index * pagenations.page_size
        )
      "
      border
      stripe
      show-header
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        align="center"
      ></el-table-column>
      <el-table-column
        label="真实姓名"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column
        label="邮箱"
        prop="email"
        align="center"
      ></el-table-column>
      <el-table-column
        label="角色"
        prop="identity"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <!-- 是否启动状态 -->
          <el-switch
            v-model="scope.row.access"
            @change="changeUserState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="editbutton" type="warning" icon="el-icon-edit" @click="editUser(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="openDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagenation">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagenations.page_index"
            :page-sizes="pagenations.page_sizes"
            :page-size="pagenations.page_size"
            :layout="pagenations.layout"
            :total="users.length"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <UserDialog @update="closeDialog" :userInfo="userInfo" :handleUser="handleUser"/>

    <!-- 删除的对话框 -->
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
      <span>确认删除么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Delete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {paginationsSetting} from '../../tools/const_set'
import UserDialog from '../../components/User_Dialog'
export default {
  created() {
    this.getUserInfo("");
  },
  components: {
    UserDialog
  },
  data() {
    return {
      username:"",
      dialogVisible:false,
      query: "",
      users: [],
      // 分页内容
      pagenations: paginationsSetting,
      handleUser:{
        title:"",
        type:"new",
        show:false
      },
      userInfo:{}
    };
  },
  methods: {
    // 关闭对话框
    closeDialog(){
      this.getUserInfo('')
    },
    // 获取用户信息
    async getUserInfo(name) {
      // console.log(this.query)
      const result = await this.$axios.get("api/users/getUsers", {
        params: { name }
      });

      if (result.data.code == 1) {
        this.users = result.data.result;
      }
    },
    // 改变用户的状态，是否启用
    async changeUserState(row) {
      // console.log(row);
      const result = await this.$axios.post(
        `api/users/changeUserState/${row._id}`,
        { access: row.access }
      );
      // console.log(result);
      if (result.data.code == 1) {
        this.$message({
          message: "用户状态已改变!",
          type: "success"
        });
      }
    },
    // 切换分页时
    handleSizeChange(page_size) {
      this.pagenations.page_size = page_size;
      this.getUserInfo(this.query);
    },
    // 改变页码时
    handleCurrentChange(page) {
      this.pagenations.page_index = page;
      this.getUserInfo(this.query);
    },
    // 搜索用户信息
    searchUser() {
      this.getUserInfo(this.query);
    },
    // 添加用户信息
    addUser() {
      this.handleUser= {
        title:"添加新用户",
        option:"new",
        show:true
      }
      // 重置了用户信息
      this.userInfo = {
        username:"",
        name:"",
        email:"",
        password:"",
        identity:"employee"
      }
    },
    // 修改用户信息
    editUser(userInfo){
      // console.log(userInfo)
      this.handleUser= {
        title:"修改用户信息",
        type:"edit",
        show:true
      }
      this.userInfo = userInfo
    },
    // 打开删除用户
    openDialog(userInfo){
      this.userInfo = userInfo
      this.dialogVisible = true
    },
    // 删除用户
    async Delete(){
      const result = await this.$axios.post('/api/users/deleteUser',this.userInfo)
      // console.log(result)
      if(result.data.code==1){
        this.dialogVisible = false
        this.getUserInfo('')
        this.$message({
          message:result.data.msg,
          type:"success"
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
}
.pagenation {
  text-align: right;
  margin-top: 10px;
}
</style>
