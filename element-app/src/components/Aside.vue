<template>
  <div class="index_aside">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#113152"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :unique-opened="true"
    >

     <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    
      <!-- 遍历取元素 -->
      <template v-for="(item) in menuList">
        <el-submenu v-if="item.itemList" :index="item.path" :key="item.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item v-for="(citem) in item.itemList" :key="citem.path" :index="citem.path">
            <i class="el-icon-menu"></i>
            {{citem.itemTitle}}
          </el-menu-item>
        </el-submenu>
      </template>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path:'/index',
      menuList:[
        {
          title:'权限管理',
          path:'authRight',
          itemList:[
            {
              itemTitle:'用户列表',
              path:'/authRight'
            }
          ]
        },
        {
          title:'文章管理',
          path:'article',
          itemList:[
            {
              itemTitle:'文章列表',
              path:'/articleList'
            }
          ]
        },
        {
          title:'金融管理',
          path:'/financial',
          itemList:[
            {
              itemTitle:'金融列表管理',
              path:'/financialList'
            }
          ]
        }
      ]
    }
  },
};
</script>

<style scoped>
.index_aside{
    height: 100%;
}

.el-menu{
    border-right: 0
}
</style>
