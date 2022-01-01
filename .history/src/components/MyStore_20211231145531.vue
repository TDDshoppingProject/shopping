<template>
  <div>
    <!-- 调节大小 -->
    <el-radio-group v-model="size" style="margin-top: 20px">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
    <!-- 个人资料框 -->
    <el-descriptions
      style="margin-top: 15px"
      title="我的店铺"
      :column="1"
      :size="size"
      border
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          账号名
        </template>
        {{ storeForm.user.account }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          店铺名称
        </template>
        {{ storeForm.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile"></i>
          联系方式
        </template>
        {{ storeForm.user.mobile }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          地址
        </template>
        {{ storeForm.user.address }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 上传商品按钮 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button
          style="margin-top: 15px"
          type="primary"
          @click="goodsDialogVisible = true"
          >上传商品</el-button
        >
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in goodsForm" :key="item.index">
        <el-card class="card">
          <img :src="item.url" class="image" />
          <div style="padding: 14px">
            <span>{{ item.name }}</span
            ><br />
            <span>{{ item.introduce }}</span>
            <!--  底部操作按钮 -->
            <div class="bottom">
              <el-tooltip content="修改商品信息" placement="bottom">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="alterGoods(item)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip content="下架商品" placement="bottom">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteGoods"
                  circle
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 上传商品信息对话框 -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="goodsDialogVisible"
      width="50%"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="goodsEditing"
        ref="goodsFormRef"
        label-width="100px"
        style="width: 400px"
      >
        <!-- 修改商品名 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsEditing.name"></el-input>
        </el-form-item>
        <!-- 修改价格 -->
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="goodsEditing.price"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="商品图"  prop="img">
          <el-input
            v-model="goodsEditing.img"
            autocomplete="off"
            placeholder="图片 URL"
          ></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateGoodsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import ImgUpload from './ImgUpload'
export default {

  components: { ImgUpload },
  data () {
    return {
      // 商店信息
      storeForm: [],
      // 上传商品的信息
      goodsEditing: {
        name: '',
        price: '',
        img: ''
      },
      // 上传商品图片
      fileList: [],
      url: '',
      goodsForm: [
        {
          id: 101,
          url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '小汉堡',
          introduce: '好吃不贵嗷',
          price: 5
        },
        {
          id: 202,
          name: '华子',
          url: 'https://img.pszxw.com/pszxwimg/2020/09/2513330478488.jpg',
          introduce: '抽别的我咳嗽',
          price: 58
        },
        {
          id: 304,
          name: '3090ti',
          url: 'https://x0.ifengimg.com/ucms/2021_52/DAB1743C9FCE327886CE29397C6F00C252EB3A5A_size102_w800_h533.jpg',
          price: 12999
        },
        {
          id: 304,
          name: '3090ti',
          url: 'https://x0.ifengimg.com/ucms/2021_52/DAB1743C9FCE327886CE29397C6F00C252EB3A5A_size102_w800_h533.jpg',
          price: 12999
        },
        {
          id: 304,
          name: '3090ti',
          url: 'https://x0.ifengimg.com/ucms/2021_52/DAB1743C9FCE327886CE29397C6F00C252EB3A5A_size102_w800_h533.jpg',
          price: 12999
        }
      ],
      size: '',
      // 上传商品
      goodsDialogVisible: false
    };
  },
  mounted () {
    this.getShopInformation();
  },
  methods: {
    // 获取店铺信息
    getShopInformation () {
      this.$axios
        .post('/getshopinf/' + window.sessionStorage.getItem('userid'))
        .then((res) => {
          if (res.data.status === 200) {
            this.storeForm = res.data.data;
          }
          console.log(res);
        });
    },
    // 更改商品信息
    alterGoods (item) {
      this.goodsEditing = item;
      this.goodsDialogVisible = true;
    },
    // 修改商品信息
    updateGoodsInfo () {},
    // 删除商品
    deleteGoods () {},
    // 上传图片
    uploadImg () {
      this.goodsEditing.img = this.$refs.imgUpload.url
    }

  }
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.card {
  margin-top: 15px;
  width: 300px;
  height: 550px !important;
  background-color: antiquewhite;
}

.image {
  width: 80%;
  height: 80%;
}
.goodsCard {
  width: 100%;
  background-color: aqua;
}
.imgbox {
  width: 290px;
  height: 350px !important;
  background-color: rgb(87, 51, 53);
  margin: 5px;
}
.introdecebox {
  width: 270px;
  height: 190;
}
.bottom {
  display: flex;
  justify-content: space-around;
}
</style>
