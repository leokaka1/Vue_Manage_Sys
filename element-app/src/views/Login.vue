<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">小肥宅后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          :label-position="labelPosition"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <!-- 邮箱 -->
          <el-form-item label="用户名" prop="name">
            <el-input
              clearable
              v-model="loginUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              show-password
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <!-- 确认注册 -->
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
          <div class="tiparea">
            <p>
              还没有账号？现在<router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
// 解析token
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      labelPosition: "left",
      loginUser: {
        name:"",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入正确的用户名",
            trigger: "blur"
          },
          {
            min:3,max:30,message:"请输入3-30位的用户名",trigger:"blur"  
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "请输入正确的密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //   请求登录
          const result = await this.$axios.post(
            "/api/users/login",
            this.loginUser
          );
          console.log(result);
          const { code, msg, token, data } = result.data;
          //  存储token
          localStorage.setItem("token", token);
          //    请求成功
          if (code === 1 && data.access == true) {
            this.$message({
              message: msg,
              type: "success"
            });

            // 获取token(公用方法在tools中)
            const jwt_result = this.$getToken();
            this.$store.dispatch("setAuth", jwt_result.isEmpty);
            this.$store.dispatch("setUser", jwt_result.tokenJwt);
            this.$router.push("/index");
          } else {
            this.$message.error(msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg_1.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 25%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.id_selector {
  width: 100%;
}

.submit_btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
  margin-top: 10px;
}
.tiparea p a {
  color: #409eff;
}
</style>
