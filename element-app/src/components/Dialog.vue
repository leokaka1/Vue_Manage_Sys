<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :show-close="false"
    >
    <!-- 表单 -->
      <div class="form">
        <el-form
          :model="formData"
          ref="formData"
          :rules="formRules"
          label-width="120px"
          style="margin:10px;width:auto"
        >
          <el-form-item label="收支类型">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(item, index) in format_type_list"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="收支描述" prop="desc">
            <el-input
              v-model="formData.desc"
              placeholder="请输入描述内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="收入" 
              prop="income">
            <el-input
              v-model="formData.income"
              placeholder="请输入收入金额"
            ></el-input>
          </el-form-item>

          <el-form-item label="支出" 
              prop="expend">
            <el-input
              v-model="formData.expend"
              placeholder="请输入支出金额"
            ></el-input>
          </el-form-item>

          <el-form-item label="账户现金" 
              prop="cash">
            <el-input
              v-model="formData.cash"
              placeholder="请输入账户金额"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :autosize="{ minRows: 2 }"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="submitBtn" type="primary" @click="onSubmit('formData')">提交</el-button>
            <el-button class="submitBtn" type="infor" @click="hide('formData')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Object,
    formData:Object
  },
  methods: {
    onSubmit(formName) {
      // console.log(formName);
      this.$refs[formName].validate(async vali=>{
        if(vali){
          // 添加新的内容
          if(this.dialog.option == 'new'){
            this.url = '/api/profits/add'
            this.noticeMeg = "信息添加成功"
          }else{
            this.url = `/api/profits/edit/${this.formData._id}`
            this.noticeMeg = "信息修改成功"
          }

          const result = await this.$axios.post(this.url,this.formData)
          // console.log(result)
          // 清除对话框
          this.dialog.show = false
          // 显示提示
          this.$message({
            message:this.noticeMeg,
            type:'success'
          })
          // 发送事件让父视图刷新
          this.$emit('update')
        }
      })
    },
    hide(formName){
      // 隐藏对话框
      this.dialog.show = false
      this.$refs[formName].resetFields();
    }
  },
  data() {
    return {
      url:'',
      noticeMeg:'',
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      formRules: {
        income:[
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个数字', trigger: 'blur' }
        ]
      }
    };
  }
};
</script>

<style scoped>
.submitBtn {
  width: 35%;
  margin-top: 10px;
  margin-left: 5%
}
</style>
