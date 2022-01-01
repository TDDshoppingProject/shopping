<template>
<el-card>
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
      <el-descriptions-item >
        <template slot="label">
          <i class="el-icon-user"></i>
          账号
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
          <img :src="item.img" class="image" />
          <div style="height:130px">
            <span>{{ item.name }}</span
            >
            <!--  底部操作按钮 -->
            <div class="bottom" >
              <el-tooltip content="修改商品信息" placement="bottom">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="alterGoodsDialog(item.id)"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip content="下架商品" placement="bottom">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteGoods(item.id)"
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
      title="上传商品信息"
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
        <!-- 上传商品名 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsEditing.name"></el-input>
        </el-form-item>
        <!-- 上传价格 -->
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="goodsEditing.price"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="图片"  prop="img">
          <el-input
            v-model="goodsEditing.img"
            autocomplete="off"
            placeholder="图片 URL"
          ></el-input>
    <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg"
           ref="new_image">
    <el-button @click="addImage">确认添加</el-button>

        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadGoods">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 修改商品信息对话框 -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="alterGoods"
      width="50%"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="goodsEditing"
        ref="goodsForm"
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
        <el-form-item label="图片"  prop="img">
          <el-input
            v-model="goodsEditing.img"
            autocomplete="off"
            placeholder="图片 URL"
          ></el-input>
    <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg"
           ref="new_image">
    <el-button @click="addImage">确认添加</el-button>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="alterGoods = false">取 消</el-button>
        <el-button type="primary" @click="updateGoodsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 页面字体大小
      size: '',
      // 商店信息
      storeForm: [],
      // 店铺所含商品信息
      goodsForm: [],
      // 上传商品的信息
      goodsEditing: {
        name: '',
        price: '',
        img: ''
      },
      // 上传商品图片
      fileList: [],
      url: '',
      // 上传商品
      goodsDialogVisible: false,
      // 修改商品
      alterGoods: false,
      // 当前需要修改的商品Id
      gid: ''
    };
  },
  mounted () {
    this.getShopInformation();
    this.getGoodsInformation();
  },
  methods: {
    // 添加图片
    addImage: function () {
      const self = this;
      if (self.$refs.new_image.files.length !== 0) {
        const file = new FormData()
        file.append('image_data', self.$refs.new_image.files[0]);
        // 单个文件进行上传
        console.log(file)
        self.$axios.post('/addImage', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res)
          this.goodsEditing.img = res.data
        })
      }
    },
    // 获取店铺信息
    getShopInformation () {
      this.$axios
        .post('/getshopinf/' + window.sessionStorage.getItem('userid'))
        .then((res) => {
          if (res.data.status === 200) {
            this.storeForm = res.data.data;
            console.log(this.storeForm.user.account)
          }
          console.log(res);
        });
    },
    // 获取商品信息
    getGoodsInformation () {
      this.$axios.post('/business/goodslistbyshop/' + window.sessionStorage.getItem('userid'))
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            this.goodsForm = res.data.data
          }
        })
    },
    // 上传商品
    uploadGoods () {
      this.$axios.post('/business/goodsupload/' + window.sessionStorage.getItem('userid') + '/' + this.goodsEditing.name + '/' + this.goodsEditing.price, this.goodsEditing.img)
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            this.$message.success('上传成功')
            this.getGoodsInformation();
          }
        })
    },
    // 让修改商品信息显示出来，并且将商品id存入gid中
    alterGoodsDialog (gid) {
      this.alterGoods = true
      console.log('alterGoods' + this.alterGoods + 'gid:' + gid)
    },
    // 修改商品信息
    updateGoodsInfo () {
      this.$axios.post('/business/setgoods/' + this.gid + '/' + this.goodsEditing.name + '/' + this.goodsEditing.price + '/' + this.goodsEditing.img)
        .then(res => {
          console.log('/business/setgoods/' + res)
        })
    },
    // 删除商品
    deleteGoods (gid) {
      this.$axios.post('/business/deletegoods/' + gid)
        .then(res => {
          console.log('/business/deletegoods/' + res)
          this.getGoodsInformation()
        })
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
  margin: 15px;
  width: 220px;
  height: 380px !important;
  background-color: rgb(255, 255, 255);
}

.image {
  width: 180px;
  height: 220px;
}
.goodsCard {
  width: 100%;
  background-color: aqua;
}
.imgbox {
  width: 290px;
  height: 350px !important;
  background-color: rgb(87, 51, 53);
}
.introdecebox {
  width: 270px;
  height: 190;
}
.bottom {
  position:absolute;
  bottom:2px;
  transform: translate(0,-50%);
  display: flex;
  justify-content: space-between;
}
span{
  font-size: 10px;
}

</style>
