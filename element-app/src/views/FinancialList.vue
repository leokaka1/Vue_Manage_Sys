<template>
  <div class="fillContainer">
    <el-form :inline="true" ref="add_data">
      <el-form-item class="button_right">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <div class="table">
      <el-table
        :data="tableData.slice((pagenations.page_index-1)*pagenations.page_size,pagenations.page_index*pagenations.page_size)"
        border stripe fit show-header
      >
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>

        <el-table-column prop="date" label="日期" align="center">
          <!-- 添加小图标 -->
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="type" label="收支类型" align="center">
        </el-table-column>

        <el-table-column prop="desc" label="收支描述" align="center">
        </el-table-column>

        <el-table-column prop="income" label="收入" align="center">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="expend" label="支出" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="cash" label="现金账户" align="center">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>

        <el-table-column label="操作" prop="operation" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagenation">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagenations.page_index"
            :page-sizes="pagenations.page_sizes"
            :page-size="pagenations.page_size"
            :layout="pagenations.layout"
            :total="tableData.length">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"/>

    <!-- 删除的对话框 -->
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>确认删除么？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="Delete">确 定</el-button>
    </span>
  </el-dialog>
    
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  data() {
    return {
      pagenations:{
        // 当前位于
        page_index:1,
        // 总数
        total:0,
        //一页显示多少
        page_size:5,
        //  每页显示多少
        page_sizes:[5,10,15,20],
        layout:"total, sizes, prev, pager, next, jumper"
      },
      dialogVisible:false,
      rowId:'',
      tableData: [],
      formData: {
        type: "",
        desc: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dialog: {
        show: false,
        title:'',
        option:'edit'
      }
    };
  },
  components: {
    Dialog
  },
  created() {
    this.getProfile();
  },
  methods: {
    // 切换分页时
    handleSizeChange(page_size){
      // console.log(page_size)
      this.pagenations.page_size = page_size
    },

    handleCurrentChange(page){
      this.pagenations.page_index = page
    },
    async getProfile(page=1) {
      // 获取表格数据
      const result = await this.$axios.get("api/profits/",{params:{page:page,page_size:10}});
      // console.log(result.data)
      const { data, code } = result.data;
      if (code == 1) {
        this.tableData = data;
        // 设置pagination的设置
        this.setPagination(data)
      } else {
        this.$message.error("返回错误");
      }
    },
    setPagination(data){
      this.pagenations.total = data.length
    },
    handleEdit(index, row) {
      console.log("edit");
      this.dialog = {
        show:true,
        title:"修改资金信息"
      }
      
      const {type,desc,income,expend,cash,remark,_id} = row
      this.formData = {
        type,
        desc,
        income,
        expend,
        cash,
        remark,
        _id
      }
    },
    handleDelete(index, row) {
      // 删除
      this.dialogVisible = true
      this.rowId = row._id
    },
    async Delete(){
      const result = await this.$axios.delete(`/api/profits/delete/${this.rowId}`)
      this.$message({
        message:"信息删除成功!",
        type:'success'
      })
      if(result){
        this.dialogVisible = false
      }
      this.getProfile()
    },
    handleAdd() {
      // console.log('add')
      this.dialog = {
        show:true,
        title:"添加资金信息",
        option:'new'
      },

      this.formData = {}
    }
  }
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.button_right {
  float: right;
}
.pagenation{
  text-align: right;
  margin-top: 10px
}
</style>
