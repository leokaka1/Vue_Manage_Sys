<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">Leon的后台接口管理系统</span>
                <el-form :model="registerUser" :rules="rules" :label-position="labelPosition" ref="registerForm" label-width="80px" class="registerForm">
                    <!-- 用户名 -->
                    <el-form-item label="用户名" prop="username">
                        <el-input clearable v-model="registerUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <!-- 真实姓名 -->
                    <el-form-item label="真实姓名" prop="name">
                        <el-input clearable v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <!-- 邮箱 -->
                    <el-form-item label="邮箱" prop="email">
                        <el-input clearable v-model="registerUser.email" placeholder="请输入Email"></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input show-password type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="password2">
                        <el-input show-password type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    
                    <!-- 选择身份 -->
                    <el-form-item label="选择身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份" class="id_selector">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="普通用户" value="employee"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 确认注册 -->
                    <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    <!-- 返回 -->
                    <el-button type="infor" class="back_btn" @click="backFormPage">返回登录页面</el-button>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name:'register',
        data() {
            var validatePass2 = (rule, value, callback) => {   
                if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition:'left',
                registerUser:{
                    username:"",
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                    identity:"employee"
                },
                rules:{
                    username:[
                        {
                            required:true,
                            message:"用户名不能为空",
                            trigger:"blur",
                        },
                        {
                            min:2,
                            max:30,
                            message:"长度需要在2-30个字符之间",
                            trigger:"blur"
                        },
                        // {
                        //     validator:usernameCheck
                        // }
                    ],
                    name:[
                        {
                            required:true,
                            message:"真实姓名不能为空",
                            trigger:"blur",
                        },
                        {
                            min:2,
                            max:30,
                            message:"长度需要在2-30个字符之间",
                            trigger:"blur"
                        }
                    ],
                    email:[
                        {
                            required:true,
                            type:'email',
                            message:"邮箱格式不正确",
                            trigger:"blur"
                        },
                        // {
                        //     validator:emailCheck
                        // }
                    ],
                    password:[
                        {
                            required:true,
                            message:"密码不能为空",
                            trigger:"blur"
                        },
                        {
                            min:6,
                            max:30,
                            message:"密码长度在6-30位之间",
                            trigger:"blur"
                        }
                    ],
                    password2:[
                        {
                            required:true,
                            message:"密码不能为空",
                            trigger:"blur"
                        },
                        {
                            min:6,
                            max:30,
                            message:"密码长度在6-30位之间",
                            trigger:"blur"
                        },
                        {
                            validator:validatePass2,
                            trigger:"blur"
                        }
                    ]
                }
            }
        },
        methods: {
            backFormPage(){
                this.$router.push('/login')
            },
            submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                    if (valid) {   
                        // 密码
                        const md5Psd = this.$md5(this.registerUser.password)
                        // console.log(md5Psd)
                        // 请求axios
                        const {username,name,email,password,identity}  = this.registerUser
                        const params = {
                            username,
                            name,
                            email,
                            password:this.$md5(password),
                            identity
                        }
                        const result = await this.$axios.post('api/users/register',params)
                        console.log(result)
                        const {code,msg} = result.data
                        if(result){
                            if(code === 0){
                                this.$message.error(msg)
                            }else{
                                this.$message({
                                    message:"用户注册成功",
                                    type:"success"
                                })
                                // 跳转到login页面
                                this.$router.push('/login')
                            }
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
    }
</script>

<style scoped>
.register {
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
  top: 10%;
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.id_selector{
    width: 100%
}

.submit_btn {
    width: 100%
}

.back_btn{
    width: 100%;
    margin-top: 10px
}

.el-button+.el-button{
    margin-left: 0px
}
</style>