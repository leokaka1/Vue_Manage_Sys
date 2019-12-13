<template>
    <el-table
    v-if="tableData.length > 0"
    :data="tableData"
    max-height="450"
    border 
    style="width: 100%">

        <el-table-column
        type="index"
        label="序号"
        align="center"
        width="70">
        </el-table-column>

        <el-table-column
        prop="date"
        label="日期"
        align="center"
        width="250">
        </el-table-column>

        <el-table-column
        prop="type"
        label="收支类型"
        align="center"
        width="150">
        </el-table-column>

        <el-table-column
        prop="desc"
        label="收支描述"
        align="center"
        width="170">
        </el-table-column>

        <el-table-column
        prop="income"
        label="收入"
        align="center"
        width="170">
        </el-table-column>

        <el-table-column
        prop="expend"
        label="支出"
        align="center"
        width="170">
        </el-table-column>

        <el-table-column
        prop="cash"
        label="现金账户"
        align="center"
        width="170">
        </el-table-column>

        <el-table-column
        prop="remark"
        label="备注"
        align="center"
        width="220">
        </el-table-column>

        
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[

                ]
            }
        },
        created() {
            this.getProfile()
        },
        methods: {
             async getProfile() {
                // 获取表格数据
                const result = await this.$axios.get('api/profits/')
                // console.log(result.data)
                const {data,code} = result.data
                if(code == 1){
                    this.tableData = data
                }else{
                    this.$message.error('返回错误')
                } 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>