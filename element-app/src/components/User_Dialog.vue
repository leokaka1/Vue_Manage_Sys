<template>
  <div class="user_dialog">
    <el-dialog :title="handleUser.title" :visible.sync="handleUser.show">
      <el-form :model="userInfo" :rules="addUserRules" ref="addUserForm">
        <el-form-item label="用户名:" label-width="85px" prop="username">
          <el-input v-model="userInfo.username" auto-complete="off" :disabled="(handleUser.type === 'edit')"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" label-width="85px" prop="name">
          <el-input v-model="userInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" label-width="85px" prop="email">
          <el-input v-model="userInfo.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="(handleUser.type != 'edit')" label="密码:" label-width="85px" prop="password">
          <el-input v-model="userInfo.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色:" label-width="85px" prop="identity">
          <el-select v-model="userInfo.identity"  placeholder="请选择">
            <el-option
              v-for="item in identityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <div class="buttonSpace">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="confirmAction">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    closeDialog(){
      this.handleUser.show = false
      if(this.handleUser.type != 'edit'){
        this.$refs["addUserForm"].resetFields()
      }
    },
    confirmAction(){
      // console.log(this.data)
      this.$refs["addUserForm"].validate(async(validate)=>{
          if(validate){
              console.log("过了")
              let result = {}
              if(this.handleUser.type == 'edit'){
                result = await this.$axios.post('/api/users/editUser',this.userInfo)
              }else{
                result = await this.$axios.post('/api/users/register',{...this.userInfo,password:this.$md5(this.userInfo.password)})
              }
              // 调用注册用户接口
              
              // console.log(result)
              if(result.data.code==1){
                  this.$message({
                      message:result.data.msg,
                      type:"success"
                  })
              }   
              this.handleUser.show = false
              // 发送事件让父视图刷新
              this.$emit('update')
              this.$refs["addUserForm"].resetFields()
          }else{
              console.log("没过")
          }
      })
    },
  },
  data() {
    return {
      accessValue: 0, 
      addUserRules: {
        username:[
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 30, message: "请输入3-30位的用户名", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 4, message: "请输入正确的姓名", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "请输入6-10位的密码", trigger: "blur" }
        ]
      },
      identityOptions: [
        {
          value: "employee",
          label: "普通用户"
        },
        {
          value: "admin",
          label: "管理员"
        }
      ],
    };
  },
  props:{
    userInfo:Object,
    handleUser:Object
  }
};
</script>

<style lang="scss" scoped>
.buttonSpace{
  text-align: right
}
</style>