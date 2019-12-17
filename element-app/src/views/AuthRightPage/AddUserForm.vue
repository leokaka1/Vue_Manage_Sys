<template>
  <div>
    <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm">
      <el-form-item label="用户名:" label-width="80px" prop="name">
        <el-input v-model="addUserForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" label-width="80px" prop="email">
        <el-input v-model="addUserForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" label-width="80px" prop="password">
        <el-input v-model="addUserForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色:" label-width="80px" prop="identity">
        <el-select v-model="addUserForm.identity" placeholder="请选择">
          <el-option
            v-for="item in identityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("refs",this.$refs["addUserForm"])
    this.$emit("receiveData",this.addUserForm)
  },
  data() {
    return {
      accessValue: 0, 
      addUserRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 30, message: "请输入3-30位的用户名", trigger: "blur" }
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
      addUserForm: {
        name: "",
        email: "",
        password: "",
        identity: "employee",
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
  }
};
</script>

<style lang="scss" scoped></style>
