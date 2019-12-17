<template>
  <div>
    <!-- 添加用户的弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible">
      <!-- 插入的表单 -->
      <AddUserForm @refs="ref" @receiveData="receiveData"/>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmAction">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddUserForm from "./AddUserForm";
export default {
  components: {
    AddUserForm
  },
  props: {
    dialogVisible: Boolean
  },
  data() {
      return {
          refs:{},
          data:{}
      }
  },
  methods: {
      ref(refs){
          this.refs = refs
      },
      receiveData(data){
          this.data = data
      },
      closeDialog(){
        this.refs.resetFields()
        this.$emit('closeDialog')
      },
      confirmAction(){
        console.log(this.data)
        this.refs.validate(async(validate)=>{
            if(validate){
                console.log("过了")
                // 调用注册用户接口
                const result = await this.$axios.post('/api/users/register',this.data)
                // console.log(result)
                if(result.data.code==1){
                    this.$message({
                        message:"用户添加成功！",
                        type:"success"
                    })
                }   
                this.$emit('closeDialog')
                this.refs.resetFields()
            }else{
                console.log("没过")
            }
        })
      },
  },
};
</script>

<style lang="scss" scoped></style>
