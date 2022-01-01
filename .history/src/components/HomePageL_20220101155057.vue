<template>
  <div class="welcome-container">
    <el-row class="header">
      <el-col :span="8">
        <div class="my-info"><router-link to="/person" class="el-icon-user-solid" style="color: #ec9454" >我的淘多多</router-link
            >
        </div>
      </el-col>
      <el-col :span="16">
        <div class="login-sign">
        </div>
      </el-col>
    </el-row>
    <el-row class="logo-search">
      <el-col :span="6">
        <div class="logo">
          <img src="../assets/images/logo_transparent.png" alt="" />
        </div>
      </el-col>
      <el-col :span="18">
        <div class="search">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="宝贝" value="1"></el-option>
              <el-option label="店铺" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <div class="mainBox">
      <!-- 今日推荐 -->
      <el-header>
        <h3 style="padding: 10px 0 0 27%;">今日推荐</h3>
      </el-header>
      <el-container>
        <el-main>
          <div class="block">
            <el-carousel trigger="click">
              <el-carousel-item v-for="item in imgDate" :key="item.id">
                <img
                  :src="item.url"
                  style="width: 100%; border-radius: 20px;"
                  object-fit="fit"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-main>
        <el-aside width="30%">
          <div class="ad">
            这里是广告
          </div>
        </el-aside>
      </el-container>
    </div>
    <div class="adBox">
        <div class="like" >
          猜你喜欢
        </div>
        <div class="likeBox" >
          <el-row :gutter="20" >
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col" v-for="goods in goodList" :key="goods.index">
              <div class="grid-content bg-blue" @click='toView(goods.id)'>
                <el-link :underline="false" target="_blank">
                  <img :src="goods.img" style="height:250px;weight:80px">
                </el-link>
                <el-link :underline="false" class="goods-name" >
                  {{goods.name}}
                </el-link>
              </div>
            </el-col>

          </el-row>
        </div>
    </div>
    <div class="footer">
      <div class="copyright">
        copyright
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      input: '',
      select: '',
      search: '',
      goodList: [],
      imgDate: [
        {
          id: 1,
          url: require('../assets/images/1.jpeg')
        },
        {
          id: 2,
          url: require('../assets/images/2.jpeg')
        },
        {
          id: 3,
          url: require('../assets/images/3.jpeg')
        },
        {
          id: 4,
          url: require('../assets/images/4.jpeg')
        }
      ]
    };
  },
  mounted () {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    getGoodsList () {
      this.$axios.post('/goodslist', '"' + this.search.toString() + '"')
        .then(res => {
          if (res.status === 200) {
            this.goodList = res.data.data
            console.log(res.data)
          } else {
            return this.$message.error('商品列表获取失败')
          }
        })
    },
    toView (goods) {
      console.log(goods)
      window.sessionStorage.setItem('gid', this.goods);
      // 页面传值将想要查看的商品id传递给googsview页面
      this.$router.push({ name: 'goodsview', params: { id: goods } })
      console.log('gid' + goods)
    }
  }
}
</script>

<style lang="less" scoped>
.welcome-container {
  background-color: #eae8e8;
}
.el-aside{
  margin: 20px;
}
.el-col {
  border-radius: 4px;
}
.header {
  height: 30px;
  background-color: #f5f5f5;
}
.my-info {
  line-height: 30px;
  text-align: center;
}
.login-sign {
  line-height: 30px;
  text-align: end;
}
.shopping-car {
  margin-right: 30px;
}
.sign {
  margin-left: 5px;
  margin-right: 130px;
}
.logo-search {
  height: 120px;
}
.logo {
  text-align: end;
}
.search {
  height: 120px;
  line-height: 120px;
}
.el-select {
  width: 100px;
}
.el-input {
  width: 500px;
  margin-left: 100px;
  border: 1px solid #ec9454;
  border-radius: 30px;
}

/deep/ .el-input__inner {
  height: 60px;
}

/deep/ .el-input-group__prepend {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

/deep/ .el-input-group__append {
  color: #fff;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  width: 60px;
  background-color: #ec7a29;
}

.mainBox {
  margin: 5px 10% 0;
  /* border-radius: 20px; */
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: #fff;
}
.block {
  border-radius: 20px;
  width: 100%;
}

.ad {
  margin:5px;
  border-radius: 10px;
  height: 300px;
  background-color: #f4f4f4;
}

.adBox {
  margin: 0px 10%;
  padding: 10px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #fff;
}

.adBox .like {
  padding: 10px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 28px;
}

li {
  list-style-type: none;
}

.likeBox {
  width: 100%;
}

.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 20px;
}
.el-col-lg-4-8 {
  width: 20%;
}
.bg-blue:hover {
  box-shadow:  19px 19px 38px #7b7b7b;
}
.grid-content {
  border-radius: 20px;
  min-height: 36px;
}

.el-link img {
  border-radius: 10px;
  margin: 10px 10px 0 10px;
  width: 90%;
}
.goods-name {
  color: #000;
  padding: 0 15%;
}

.footer {
  background-color: #fff;
  margin: 20px 0;
  padding: 10px;
}

.footer .copyright {
  margin: 0 10%;
}

a{
  text-decoration: none;
  color:#EC9454;
}
.router-link-active {
  text-decoration: none;
}
.card-panel-col{
    height:300px;
}
</style>
