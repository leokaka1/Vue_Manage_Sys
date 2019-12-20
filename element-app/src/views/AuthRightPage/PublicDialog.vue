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
  components: {
    AddUserForm
  },
  props: {
    showType:String,
    dialogVisible: Boolean
  },
  methods: {
      closeDialog(){
        this.$emit('closeDialog')
      },
  },
};
</script>

<style lang="scss" scoped></style>
