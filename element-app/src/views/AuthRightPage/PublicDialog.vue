<template>
  <div>
    <!-- 添加用户的弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible">
      <!-- 插入的表单 -->
      <AddUserForm @closeDialog="closeDialog"/>

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
