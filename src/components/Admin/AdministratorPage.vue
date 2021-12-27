<template>
  <el-container class="container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="../../assets/title.png">
        <span>淘多多后台管理系统</span>
      </div>
      <el-button class="but1" round @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏菜单区域 -->
      <el-aside v-bind:width="isCollapse? '64px':'200px'">
          <div class="toggleButton" @click="toggleCollapse">|||&nbsp;</div>
        <el-menu
          background-color="#F9F9F9"
          text-color="rgb(95, 98, 100)"
          active-text-color="#6495ED"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!--  一级菜单模板区 -->
            <template slot="title">
               <!--  图标 -->
              <i class="el-icon-s-custom"></i>
             <!--  文本 -->
              <span>用户管理</span>
            </template>
             <!-- index作为路由跳转path '/'+path(默认返回值没有以斜线开头) -->
            <el-menu-item index="/business" @click="saveNavState('/welcome')"><i class="el-icon-data-line"></i>商家列表
            </el-menu-item>
            <el-menu-item index="/users" @click="saveNavState('/users')"><i class="el-icon-data-board"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <template slot="title">
               <!--  图标 -->
              <i class="el-icon-s-claim"></i>
             <!--  文本 -->
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods" @click="saveNavState('/goods')"><i class="el-icon-s-cooperation"></i>商品列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区 -->
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menulist: [],
      // 是否折叠，false不折叠
      isCollapse: false,
      // 被激活的链接
      activePath: ''
    }
  },
  methods: {
    logout () {
      // 清空sessionStorage中的token
      window.sessionStorage.clear()
      // 跳转到登录页面
      this.$router.push('/')
    },
    // 获取所有
    getMenuList () {
      this.$axios.get('menus')
        .then(res => {
          console.log(res)
        })
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (activePath) {
      console.log(activePath)
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
};
</script>
<style lang="less">
.container {
  height: 100%;
}
.el-header {
  background-color: #EC9454 !important;
  height:35px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color:#cfd5db;
  font-size: 20px;
  color: #474C59;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      font-size: 18px;
    }
  }
}
.el-aside {
  background-color: #F9F9F9;
  box-shadow:0 1px 1px 1px #d4dde4;
  border-radius: 6px;
  margin:15px 0px 0 20px;
  .el-menu{
    border-right:none;
  }
}
.toggleButton{
    background: #f0d8c6;
    color:aliceblue;
    text-align: center;
    letter-spacing: 3px;
    // 鼠标放置时变为手
    cursor: pointer;
}
.but1{
  line-height: 3px !important;
}
</style>
