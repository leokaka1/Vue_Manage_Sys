<template>
  <div class="index_aside">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#113152"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>金融入库</span>
        </template>
        <el-menu-item index="1-1">库存列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.index_aside{
    height: 100%;
}

.el-menu{
    border-right: 0
}

.el-menu .el-menu-item{
        
}
</style>
