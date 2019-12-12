<template>
  <div>
    页面初始化
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  created() {
    //   页面刷新的时候再次调用一下
    const jwt_result = this.$getToken()
    this.$store.dispatch('setAuth',jwt_result.isEmpty)
    this.$store.dispatch('setUser',jwt_result.tokenJwt)
  },
};
</script>

<style lang="scss" scoped></style>
