<template>
    <el-container class="personContainer" ref="child">
      <!-- 头部区域 -->
      <el-header height="100px">
        <div>
          <img src="../assets/logo_transparent.png" alt="" class="img">
          <span>Welcome Home!</span>
        </div>
        <div>
          <router-link to="/homePage">首页</router-link>
          <el-button class="but1" round @click="tohomeoage">首页</el-button>
          <el-button class="but2" round @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区 -->
          <el-menu background-color="#EAEDF1" text-color="black" active-text-color="#EC9454"
          default-active="/information">
            <!-- 个人信息 -->
            <el-menu-item index="1" @click="jump('/information')">
              <i class="el-icon-user"></i>
              <span slot="title" style="margin-left: 15px">个人信息</span>
            </el-menu-item>

            <!-- 购物车 -->
            <el-menu-item index="2" @click="jump('/cart')">
              <i class="el-icon-shopping-cart-2"></i>
              <span slot="title" style="margin-left: 15px">购物车</span>
            </el-menu-item>

            <!-- 我的订单 -->
            <el-menu-item index="3" @click="jump('/order')">
              <i class="el-icon-document"></i>
              <span slot="title" style="margin-left: 15px">我的订单</span>
            </el-menu-item>
             <!-- 升级成商家 -->
            <el-menu-item index="applystore" @click="jump('/applystore')" v-if="this.role === '0'">
              <i class="el-icon-office-building"></i>
              <span slot="title" style="margin-left: 15px">升级成商家</span>
            </el-menu-item>
            <!-- 我的店铺 -->
          <el-submenu index="1" v-if="this.role === '1'">
            <!--  一级菜单模板区 -->
            <template slot="title">
               <!--  图标 -->
              <i class="el-icon-s-custom"></i>
             <!--  文本 -->
              <span style="margin-left: 15px">我的店铺</span>
            </template>
             <!-- index作为路由跳转path '/'+path(默认返回值没有以斜线开头) -->
            <!-- 我的店铺 -->
            <el-menu-item index="/bussinessorder" @click="jump('/bussinessorder')" >
              <i class="el-icon-office-building"></i>
              <span slot="title" style="margin-left: 15px">管理订单</span>
            </el-menu-item>
            <el-menu-item index="/store" @click="jump('/store')" >
              <i class="el-icon-office-building"></i>
              <span slot="title" style="margin-left: 15px">管理店铺</span>
            </el-menu-item>
          </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      isCollapse: false,
      // 判断用户角色
      role: ''
    }
  },
  mounted () {
    this.judge()
  },
  methods: {
    tohomeoage () {
      this.$router.push('/homePage')
    },
    logout () {
      // 清空sessionStorage中的token
      window.sessionStorage.clear()
      // 跳转到登录页面
      this.$router.push('/')
    },
    judge () {
      this.role = window.sessionStorage.getItem('role')
      console.log('role:' + this.role)
    },
    jump (activePath) {
      this.$router.push(activePath);
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.personContainer {
  height: 100%;
}

.el-header {
  background-color: #EC9454;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  // color: #fff;
  align-items: center;
  font-size:50px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      font-family: Microsoft YaHei;
    }
  }
}

.el-aside {
  background-color: #EAEDF1;
}

.img {
  width: 100px;
  height: 100px;
}

.toggle-button {
  background-color: #bcc0ce;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  color: rgb(255, 255, 255);
  letter-spacing: 0.2em;
  cursor: pointer;
}
a{
  text-decoration: none;
  color:#ffffff;
  font-size: 10px;
}
.router-link-active {
  text-decoration: none;
  }
</style>
