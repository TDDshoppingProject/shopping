<template>
  <div class="container">
    <div class="header">
      <div class="alink">
        <router-link to="homePage">回到首页</router-link>
        <router-link to="person">查看我的购物车</router-link>
      </div>
    </div>
    <div class="goodsBox">
      <div class="goodsImg">这里是图片</div>
      <div class="goodsIntroduce" v-for="item in goodList" :key="item.index">
        {{ item.name }}
        <span class="goodsPrice"> ¥{{ item.price }} </span>
      </div>
      <div class="cartbtn">
        <el-button type="warning" @click="addToShoppingCart"
          >加入购物车</el-button
        >
        <el-button type="primary" @click="toPurchase"
          >直接购买</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goods: '',
      goodList: []
    };
  },
  mounted () {
    this.getGoodsList();
  },
  methods: {
    // 获取用户列表
    getGoodsList () {
      this.goods = this.$route.params.id;
      console.log(this.goods);
      this.$axios
        .post('admin/goodslist', '"' + this.goods.toString() + '"')
        .then((res) => {
          if (res.status === 200) {
            this.goodList = res.data.data;
            console.log(res.data);
          } else {
            return this.$message.error('商品列表获取失败');
          }
        });
    },
    // 将商品放进购物车
    addToShoppingCart () {
      this.$axios.post('cart', this.goodList)
        .then(res => {
          if (res.status === 200) {
            console.log(res.status)
            this.$message.success('已成功加入购物车')
          } else {
            this.$message.error('加入购物车失败')
          }
        })
    },
    // 直接购买
    toPurchase () {
      this.$axios.post('addorder', window.sessionStorage.setItem('userid'))
        .then(res => {
          console.log(res)
          // 成功跳转到支付页面
          if (res.status === 200) {
            this.$roter.push()
          } else {
            this.$message.error('购买失败')
          }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #f8f5f4;
  height: 100%;
  display:flex;
  flex-direction:column;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #ec9454;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -5%);
}
.goodsBox {
  width: 100%;
  height: 300px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
}
a {
  text-decoration: none;
  color: #ffffff;
}
.router-link-active {
  text-decoration: none;
}
.alink {
  display: flex;
  justify-content:space-between;
  padding: 11px 10px 11px 10px;
}
.goodsImg {
  position: absolute;
  margin: 20px;
  width: 200px;
  height: 260px;
  box-shadow: 0 0 1px #ebe9e9;
}
.goodsIntroduce {
  position: absolute;
  padding: 20px 10px 20px 10px;
  font-size: 22px;
  color: rgb(117, 117, 124);
  margin: 20px 20px 0 240px;
  width: 880px;
  height: 140px;
  .goodsPrice {
    position: absolute;
    bottom: 10px;
    left: 20px;
    color: rgb(189, 32, 32);
    font-size: 25px;
    font-family: 黑体;
  }
}
// 加入购物车按钮
.cartbtn {
  position: absolute;
  padding: 20px 10px 20px 10px;
  color: rgb(33, 33, 39);
  margin: 200px 20px 0 240px;
  display:flex;
}
.el-button--warning {
  line-height: 1.5;
  width: 150px;
  font-size: 20px;
  margin-left:0;
}
.el-button--primary {
  line-height: 1.5;
  width: 150px;
  font-size: 20px;
  margin-right:0;
}

</style>
