<template>
  <div class="Container">
    <el-container>
      <el-header>
      <div>
        <img src="../assets/logo_transparent.png">
      </div>
        <el-button round @click="toHomePage">回到主页</el-button>
      </el-header>
      <el-main>
          <div class="Box">
      <span>支付成功</span>
      <router-link to="/order">点击查看我的订单</router-link>
    </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    toHomePage () {
      this.$router.push('/homePage')
    }
  }
};
</script>
<style lang="less" scoped>
span {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  color: red;
  font-size: 26px;
  font-weight: bold;
}
.Container {
  height: 100%;
}
.Box {
  width: 500px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 160px;
  transform: translate(-50%, 0);
  align-items: center;
  text-align: center;
}
img{
    height:180px;
    width:220px;
}
a {
  text-decoration: none;
  color: #ec9454;
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%, 0);
}
.router-link-active {
  text-decoration: none;
}
.el-header{
  height:80px !important;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content:space-between;
  }
}
</style>
