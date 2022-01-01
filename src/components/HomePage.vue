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
        <div class="like">
          猜你喜欢
        </div>
        <div class="likeBox">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                曼叙 |恬素 | 仿古陶瓷草木灰釉中式餐具碗盘碟家庭套装食器日式
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox1.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                三分妄想原神cos服枫原万叶cosplay男装日常卫衣同人cospaly男装
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox2.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                【原神】若陀龙王毛绒挂件 钥匙扣配饰 Genshin
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox3.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                [可可屋]日本原装进口万古烧土锅砂锅银峯花三岛电磁炉兼用火锅炒
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox4.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                出口60支贡缎全棉枕套五星级酒店专用加大乳胶刺绣大号枕头套单人
                </el-link>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox5.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                三分妄想原神cos服璃月七星刻晴日常服cospaly女装服装套装c服
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox6.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                春秋薄款洛丽塔蕾丝花边长筒袜萝莉提花白色中筒学生JK小腿堆堆袜
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox7.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                简约现代窗帘绑带客厅百搭磁铁窗帘扣挂钩免打孔创意窗帘绳子绑带
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox8.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                日式创意吃饭碗陶瓷碗套装家用碗筷套装礼品餐具礼盒装婚庆回礼
                </el-link>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
              <div class="grid-content bg-blue">
                <el-link :underline="false" target="_blank">
                  <img src="../assets/images/adBox9.webp" alt="">
                </el-link>
                <el-link :underline="false" class="goods-name">
                美式乡村亚麻窗帘北欧简约现代 文艺卧室客厅日系遮光 成品窗纱帘
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
  }
};
</script>

<style lang="less" scoped>
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
}

.ad {
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
</style>
