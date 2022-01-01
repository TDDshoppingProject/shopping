<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#EB9354"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
        <router-link to="/homePage">回到首页</router-link></el-menu-item>
        <el-menu-item index="2">
          <router-link to="/person">个人页面</router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div class="goodsBox">
        <div class="goodsImg">这里是图片</div>
        <div class="goodsIntroduce" v-for="item in goodList" :key="item.index">
          {{ item.name }}
          <span class="goodsPrice"> ¥{{ item.price }} </span>
        </div>
        <template>
          <div class="selectfont">
            <span>数量</span>
            <el-input-number
              v-model="number"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
              size="mini"
            ></el-input-number>
          </div>
        </template>
        <div class="cartbtn">
          <el-button type="warning" @click="addToShoppingCart"
            >加入购物车</el-button
          >
          <el-button type="primary" @click="toPurchase">直接购买</el-button>
        </div>
      </div>
      <el-table :data="reviewList" style="width: 100%">
        <el-table-column label="用户" width="280px">
          <template slot-scope="scope">
            <span> {{ scope.row.user.account }} </span>
          </template> </el-table-column>
        <el-table-column label="评论" width="1500px">
          <template slot-scope="scope">
            <span> {{ scope.row.text }} </span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      goods: '',
      search: '',
      goodList: [],
      id: '',
      number: 1,
      reviewList: [],
      num: 1
    };
  },
  mounted () {
    this.getGoodsList();
    this.getReview();
  },
  methods: {
    // 获取商品列表
    getGoodsList () {
      this.goods = this.$route.params.id;
      window.sessionStorage.setItem('gid', this.goods);
      this.$axios
        .post('/getgoods/' + window.sessionStorage.getItem('gid'))
        .then((res) => {
          if (res.status === 200) {
            this.goodList = res.data.data;
            this.id = res.data.data.goods.id;
            console.log(
              this.number,
              this.id,
              parseInt(window.sessionStorage.getItem('userid'))
            );
          } else {
            return this.$message.error('商品列表获取失败');
          }
        });
    },
    // 显示商品的评论
    getReview () {
      this.$axios
        .post('/getgoods/' + window.sessionStorage.getItem('gid'))
        .then((result) => {
          console.log(result.data.data.review);
          if (result.status === 200) {
            this.reviewList = result.data.data.review;
          }
        });
    },
    // 将商品放进购物车
    addToShoppingCart () {
      /*  this.$axios.post('cart', this.goodList)
        .then(res => {
          if (res.status === 200) {
            console.log(res.status)
            this.$message.success('已成功加入购物车')
          } else {
            this.$message.error('加入购物车失败')
          }
        }) */
    },
    handleChange (value) {
      console.log(value);
    },
    // 直接购买
    toPurchase () {
      this.$axios
        .post(
          '/createorder/' +
            this.number +
            '/' +
            this.id +
            '/' +
            parseInt(window.sessionStorage.getItem('userid'))
        )
        .then((res) => {
          console.log(res);
          // 成功跳转到支付页面
          if (res.status === 200) {
            this.$router.push('/purchase');
          } else {
            this.$message.error('购买失败');
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #cc3232;
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -5%);
}
.goodsBox {
  width: 100%;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
  box-shadow: 0 0 1px #924a4a;
}
a {
  text-decoration: none;
  color: #ffffff;
}
.router-link-active {
  text-decoration: none;
}
.goodsImg {
  position: absolute;
  margin: 60px;
  width: 250px;
  height: 340px;
  box-shadow: 0 0 1px #ebe9e9;
}
.goodsIntroduce {
  position: absolute;
  padding: 20px 10px 20px 10px;
  font-size: 22px;
  color: rgb(117, 117, 124);
  margin: 60px 60px 20px 340px;
  width: 880px;
  height: 120px;
  .goodsPrice {
    position: absolute;
    bottom: 10px;
    left: 20px;
    color: rgb(189, 32, 32);
    font-size: 25px;
    font-family: 黑体;
  }
  .numchoosebtn {
    position: absolute;
    bottom: 10px;
    left: 100px;
  }
}
// 加入购物车按钮
.cartbtn {
  position: absolute;
  top: 95px;
  padding: 30px 10px 20px 100px;
  color: rgb(33, 33, 39);
  margin: 200px 20px 0 240px;
  display: flex;
}
.el-button--warning {
  line-height: 1.5;
  width: 150px;
  font-size: 20px;
  margin-left: 0;
}
.el-button--primary {
  line-height: 1.5;
  width: 150px;
  font-size: 20px;
  margin-right: 0;
}
.selectfont {
  display: flex;
  position: absolute;
  top: 180px;
  width: 200px;
  margin: 60px 60px 20px 640px;
  color: #b1b1b1;
}
.el-input-number {
  width: 120px;
  left: 20px;
}
.el-header {
  height: 70px !important;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: space-between;
  }
}
.el-main {
  height: 100%;
}
.el-table {
  position: absolute;
  top: 590px;
  margin:0 50px 0 50px;
}
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #EB9354;
}
</style>
