<template>
  <div class="index_aside">
    <el-menu
      default-active="index"
      class="el-menu-vertical-demo"
      background-color="#113152"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >

     <el-menu-item index="index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item index="articleList">文章列表</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>金融管理</span>
        </template>
        <el-menu-item index="financialList">金融列表管理</el-menu-item>
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
