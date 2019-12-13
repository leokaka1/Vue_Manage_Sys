<template>
  <div class="dialog">
    <el-dialog
      title="添加资金信息"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          :model="formData"
          :ref="form"
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

          <el-form-item label="收支描述">
            <el-input
              prop="desc"
              v-model="formData.desc"
              placeholder="请输入描述内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="收入">
            <el-input
              prop="income"
              v-model="formData.income"
              placeholder="请输入收入金额"
            ></el-input>
          </el-form-item>

          <el-form-item label="支出">
            <el-input
              prop="expend"
              v-model="formData.expend"
              placeholder="请输入支出金额"
            ></el-input>
          </el-form-item>

          <el-form-item label="账户现金">
            <el-input
              prop="cash"
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

          <el-button class="submitBtn" type="primary" @click="onSubmit(form)">提交</el-button>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Object
  },
  methods: {
    onSubmit(form) {
      console.log(form);
    },
  },
  data() {
    return {
      formData: {
        type: "",
        desc: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      formRules: {}
    };
  }
};
</script>

<style scoped>

.submitBtn {
  width: 300px;
}
</style>
