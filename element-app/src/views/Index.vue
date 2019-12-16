<template>
  <div class="index">
    <el-container class="index_container">
      <!-- 头部区域 -->
      <el-header>
        <HeaderNav />
      </el-header>
      <!-- 内容区 -->
      <el-container class="body">
        <!-- 左侧的侧边栏 -->
        <el-aside width="200px" class="index_aside">
          <Aside />
        </el-aside>
        <!-- 右边的主体区 -->
        <el-main class="index_main">
          <!-- 显示面包屑导航和折叠按钮 -->
          <Breadcrumb/>
          <!-- 用card包裹内容 -->
          <el-card>
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import HeaderNav from "../components/Header";
import Aside from "../components/Aside";
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: "index",
  created() {
    //   页面刷新的时候再次调用一下
    const jwt_result = this.$getToken();
    this.$store.dispatch("setAuth", jwt_result.isEmpty);
    this.$store.dispatch("setUser", jwt_result.tokenJwt);
  },
  components: {
    HeaderNav,
    Aside,
    Breadcrumb
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}
.el-header {
  width: 100%;
  padding: 0px;
}
.el-main {
  padding: 0px;
  background-color: #eaedf1;
}
.index_container {
  height: 100%;
  padding: 0;
}

.body .index_aside {
  height: 100%;
  background-color: #113152;
}

.el-card {
  margin: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.15)!;
}


</style>
