<template>
  <div>
    <!-- 添加用户的弹窗 -->
    <el-dialog :title="handleUser.title" :visible.sync="dialogVisible">
      <!-- 插入的表单 -->
      <AddUserForm @closeDialog="closeDialog" :userInfo = "this.$store.getters.targetUser"/>

    </el-dialog>
  </div>
</template>

<script>
import AddUserForm from "./AddUserForm";
export default {
  mounted() {
    this.$on('openDialog',()=>{
      console.log("对话框打开")
      this.dialogVisible = true
    })
  },
  components: {
    AddUserForm
  },
  props: {
    showType:String,
    handleUser:{
      title:""
    }
  },
  data() {
    return {
      dialogVisible:false
    }
  },
  methods: {
      closeDialog(){
        // console.log("关闭对话框")
        this.$emit("closeDialog",false)
        this.dialogVisible = false
      },
  },
};
</script>

<style lang="scss" scoped></style>
