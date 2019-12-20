<template>
  <div>
    <el-form :model="userInfo" :rules="addUserRules" ref="addUserForm">
      <el-form-item label="用户名:" label-width="80px" prop="username">
        <el-input v-model="userInfo.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名:" label-width="85px" prop="name">
        <el-input v-model="userInfo.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" label-width="80px" prop="email">
        <el-input v-model="userInfo.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="!userInfo.username" label="密码:" label-width="80px" prop="password">
        <el-input v-model="userInfo.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色:" label-width="80px" prop="identity">
        <el-select v-model="userInfo.identity" placeholder="请选择">
          <el-option
            v-for="item in identityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <div class="buttonSpace">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmAction">确 定</el-button>
      </div>    
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    closeDialog(){
      this.$emit("closeDialog")
      this.$refs["addUserForm"].resetFields()
    },
    confirmAction(){
      // console.log(this.data)
      this.$refs["addUserForm"].validate(async(validate)=>{
          if(validate){
              console.log("过了")
              // 调用注册用户接口
              const result = await this.$axios.post('/api/users/register',{...this.userInfo,password:this.$md5(this.addUserForm.password)})
              // console.log(result)
              if(result.data.code==1){
                  this.$message({
                      message:"用户添加成功！",
                      type:"success"
                  })
              }   
              this.$emit('closeDialog')
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
      accessOptions: [
        {
          value: 0,
          label: "不启用"
        },
        {
          value: 1,
          label: "启用"
        }
      ]
    };
  },
  props:{
    userInfo:Object
  }
};
</script>

<style lang="scss" scoped>
.buttonSpace{
  text-align: right
}
</style>
