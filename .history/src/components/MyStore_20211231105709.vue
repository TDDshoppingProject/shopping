<template >
  <div>
    <!-- 调节大小 -->
    <el-radio-group v-model="size" style="margin-top: 20px">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
    <!-- 个人资料框 -->
    <el-descriptions style="margin-top: 15px" title="我的店铺" :column="1" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          UID
        </template>
        {{storeForm.id}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          店铺名称
        </template>
        {{storeForm.name}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile"></i>
          联系方式
        </template>
        {{storeForm.mobile}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          地址
        </template>
        {{storeForm.address}}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 修改商铺资料按钮 -->
    <el-row :gutter="20">
      <el-col :span="4">
        <el-button style="margin-top: 15px" type="primary" @click="alterDialogVisible = true">修改资料</el-button>
      </el-col>
    </el-row>

    <!-- 修改商铺资料对话框 -->
    <el-dialog title="修改商铺资料" :visible.sync="alterDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form :model="storeForm" ref="storeFormRef" label-width="100px" style="width: 400px">
        <!-- 修改店名 -->
        <el-form-item label="店铺名" prop="name">
          <el-input v-model="storeForm.name"></el-input>
        </el-form-item>
        <!-- 修改联系方式 -->
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model.number="storeForm.mobile"></el-input>
        </el-form-item>
        <!-- 修改地址 -->
        <el-form-item label="地址" prop="address">
          <el-input v-model="storeForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="alterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 商品信息 -->
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in goodsForm" :key="item.index" >
        <el-card class="card">
          <img :src="item.url" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span><br>
            <span>{{item.introduce}}</span>
            <!--  底部操作按钮 -->
            <div class="bottom">
              <el-tooltip content="修改商品信息" placement="bottom">
                <el-button type="primary" icon="el-icon-edit" @click="alterGoods(item)" circle></el-button>
              </el-tooltip>
              <el-tooltip content="下架商品" placement="bottom">
                <el-button type="danger" icon="el-icon-delete" @click="deleteGoods" circle></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
          <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>

    <!-- 修改商品信息对话框 -->
    <el-dialog title="修改商品信息" :visible.sync="goodsDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form :model="goodsEditing" ref="goodsFormRef" label-width="100px" style="width: 400px">
        <!-- 修改商品名 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsEditing.name"></el-input>
        </el-form-item>
        <!-- 修改价格 -->
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="goodsEditing.price"></el-input>
        </el-form-item>
        <!-- 修改商品介绍 -->
        <el-form-item label="商品介绍" prop="introduce">
          <el-input v-model.number="goodsEditing.introduce"></el-input>
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
export default {
  data () {
    return {
      storeForm: {
        id: 101,
        name: '华莱士',
        url: 'https://img.pszxw.com/pszxwimg/2020/09/2513330478488.jpg',
        address: '到处都有',
        mobile: 10086,
        number: 2
      },
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
        }
      ],
      size: '',
      alterDialogVisible: false,
      goodsDialogVisible: false,
      // 正在修改的商品
      goodsEditing: {}
    };
  },
  methods: {
    // 修改店铺信息
    updateUserInfo () {
    },
    // 更改商品信息
    alterGoods (item) {
      this.goodsEditing = item
      this.goodsDialogVisible = true
    },
    // 删除商品
    deleteGoods () {

    }
  }
}
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
  height: 350px;
}

.bottom {
  margin-top: 10px;
}

.image {
  width: 80%;
  height: 80%;
}
</style>
