<template>
  <div class="welcome-container">
    <el-row class="header">
      <el-col :span="8">
        <div class="my-info">
          <el-link :underline="false"
            ><i class="el-icon-user-solid" style="color: #ec9454"></i
            >我的淘多多</el-link
          >
        </div>
      </el-col>
      <el-col :span="16">
        <div class="login-sign">
          <el-link :underline="false" type="warning" class="shopping-car"
            ><i class="el-icon-shopping-cart-2"></i>购物车</el-link
          >
          <el-link :underline="false" type="danger">请登录</el-link>
          <el-link :underline="false" class="sign">免费注册</el-link>
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
      <h3 style="padding: 10px 0 0 27%;">今日推荐</h3>
      <el-container>
        <el-main style="width: 100%;margin-top: 2%;">
          <div class="block">
            <el-carousel trigger="click">
              <el-carousel-item v-for="item in imgDate" :key="item">
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
        <div class="like">
          猜你喜欢
        </div>
        <div class="likeBox">
          <ul>
            <li>
              <el-link :underline="false" target="_blank"><img src="../assets/images/adBox.webp" alt=""></el-link>
              <el-link :underline="false">
                曼叙 |恬素 | 仿古陶瓷草木灰釉中式餐具碗盘碟家庭套装食器日式
              </el-link>
            </li>
            <li>
              <el-link :underline="false" target="_blank"><img src="../assets/images/adBox.webp" alt=""></el-link>
              <el-link :underline="false">
                曼叙 |恬素 | 仿古陶瓷草木灰釉中式餐具碗盘碟家庭套装食器日式
              </el-link>
            </li>
            <li>
              <el-link :underline="false" target="_blank"><img src="../assets/images/adBox.webp" alt=""></el-link>
              <el-link :underline="false">
                曼叙 |恬素 | 仿古陶瓷草木灰釉中式餐具碗盘碟家庭套装食器日式
              </el-link>
            </li>
            <li>
              <el-link :underline="false" target="_blank"><img src="../assets/images/adBox.webp" alt=""></el-link>
              <el-link :underline="false">
                曼叙 |恬素 | 仿古陶瓷草木灰釉中式餐具碗盘碟家庭套装食器日式
              </el-link>
            </li>
            <li>
              <el-link :underline="false" target="_blank"><img src="../assets/images/adBox.webp" alt=""></el-link>
              <el-link :underline="false">
                曼叙 |恬素 | 仿古陶瓷草木灰釉中式餐具碗盘碟家庭套装食器日式
              </el-link>
            </li>
          </ul>
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
      imgDate: [
        {
          url: require('../assets/images/1.jpeg')
        },
        {
          url: require('../assets/images/2.jpeg')
        },
        {
          url: require('../assets/images/3.jpeg')
        },
        {
          url: require('../assets/images/4.jpeg')
        }
      ]
    };
  }
};
</script>

<style scoped>
.welcome-container {
  background-color: #eae8e8;
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
  padding: 10px;
}

.ad {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 10px;
  padding: 10px;
  border-radius: 20px;
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
  height: 290px;
}

.likeBox ul li {
  padding: 5px;
  float: left;
  width: 17%;
  height: 280px;
  margin: 0 0.9%;
  background-color: skyblue;
  border-radius: 10px;
}

.likeBox ul li img {
  border-radius: 10px;
  width: 100%;
}
.likeBox ul li .el-link{
  color: #000;
  padding: 0 5px;
}

.footer {
  background-color: #fff;
  margin: 20px 0;
  padding: 10px;
}

.footer .copyright {
  margin: 0 10%;
}
</style>
