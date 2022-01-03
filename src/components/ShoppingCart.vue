<template>
<el-card>
  <div>
    <el-table :data="cartForm" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 多选按钮 -->
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.goodsId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img style="width: 100px; height: 100px" :src="scope.row.goodsImg">
        </template>
      </el-table-column>

      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">
          <span class="name">{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单价" width="180">
        <template slot-scope="scope">
          <span  class="price">{{ scope.row.goodsPrice }} 元</span>
        </template>
      </el-table-column>

      <el-table-column label="总价" width="180" class="price">
        <template slot-scope="scope">
          <span  class="price">{{ scope.row.goodsPrice*scope.row.num }} 元</span>
        </template>
      </el-table-column>

      <el-table-column label="数量" width="240">
        <template slot-scope="scope">
          <span  class="price">{{ scope.row.num }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="addGoodsById(goodsId)">+1</el-button>
          <el-button type="warning" round @click="reduceGoodsById(scope.row.gid)">-1</el-button>
          <el-button type="danger" round @click="removeGoodsById(this.$cookies.get(cart.value))">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-row>
      <el-button class="button" type="primary" round @click="addGoodsById()">+1</el-button>
      <el-button class="button" type="warning" round @click="reduceGoodsById()">-1</el-button>
      <el-button class="button" type="danger" round @click="removeGoodsById()">删除</el-button>
      <el-button class="button" type="success" @click="finishCart" round>结算</el-button>
      <el-button class="button" type="danger" @click="clearCart" round>清空购物车</el-button>
    </el-row>
  </div></el-card>
</template>

<script>
export default {
  data () {
    return {
      cartForm: [],
      goodsId: '',
      theOne: ''
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    handleSelectionChange (res) {
      this.theOne = res[0].goodsId
      console.log(this.theOne)
    },

    // 获取购物车中的数据
    getCartList () {
      this.$axios.post('/cart/getCart')
        .then(res => {
          if (res.status === 200) {
            this.cartForm = res.data.data
            console.log(res.data)
          } else {
            return this.$message.error('购物车列表获取失败')
          }
        })
    },

    // 商品数量加一
    addGoodsById () {
      this.$axios.get('/cart/addGoodsToCart/' + this.theOne).then(res => {
        console.log(res.status);
        console.log(this.theOne)
        if (res.status === 200) {
          this.$router.push('/cart');
          this.$message.success('已成功加入购物车');
        } else {
          this.$message.error('加入购物车失败');
        }
      })
      this.getCartList()
      this.$router.go(0)
    },

    // 商品数量减一
    reduceGoodsById () {
      console.log(this.theOne);
      this.$axios.post('/cart/deleteByGoodsId/' + this.theOne).then(res => {
        if (res.status === 200) {
          this.$message.success('删除商品成功');
        } else {
          this.$message.error('删除商品失败');
        }
        this.getCartList()
        this.$router.go(0)
      })
    },

    // 根据id删除对应的商品
    async removeGoodsById () {
      // 弹框询问用户是否删除
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?', '提示',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      this.$axios.post('/cart/removeGoods/' + this.theOne).then(res => {
        console.log(this.theOne)
        // console.log(this.$cookies.get(cart.value));
        if (res.status === 200) {
          this.$message.success('删除商品成功');
        } else {
          this.$message.error('删除商品失败');
        }
      })
      this.getCartList()
      this.$router.go(0)
    },

    // 结算购物车选中内容
    finishCart () {
      console.log(this.theOne);
      console.log(window.sessionStorage.getItem('userid'));
      this.$axios.post('/cart/generateOrder/' + this.theOne + '/' + window.sessionStorage.getItem('userid')
      ).then(res => {
        console.log(res.status);
        if (res.status === 200) {
          this.$message.success('结算成功');
        } else {
          this.$message.error('结算失败');
        }
      })
      this.removeGoodsById()
      this.getCartList()
      this.$router.go(0)
    },

    // 清空购物车内容
    clearCart () {
      this.$axios.post('/cart/clearCart')
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.$message.success('清空购物车成功');
          } else {
            this.$message.error('清空购物车失败');
          }
        })
      this.getCartList()
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.price {
  color: red;
  font-weight: bolder;
  margin-left: 10px;
}

.button {
  margin-top: 20px;
  float: left;
  margin-left: 15px;
}
</style>
