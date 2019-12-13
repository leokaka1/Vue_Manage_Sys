<template>
  <div class="index">
    <el-container class="index_container">
      <el-header>
        <HeaderNav/>
      </el-header>
      <el-container class="body">
          <el-aside width="200px" class="index_aside">
              <Aside/>
          </el-aside>
          <el-main class="index_main">
            <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import HeaderNav from "../components/Header";
import Aside from '../components/Aside'

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
    Aside
  }
};
</script>

<style scoped>
.index{
    width: 100%;
    height: 100%;
}
.el-header{
    width: 100%;
    padding:0px;
}
.el-main{
    padding: 0px
}
.index_container{
    height: 100%;
    padding: 0
}

.body .index_aside{
    height: 100%;
    background-color: #113152
}

</style>
