<template>
<el-card>
  <div>
    <el-table :data="goodsForm" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 多选按钮 -->
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <div class="demo-image">
            <div class="block">
              <el-image style="width: 100px; height: 100px" :src="scope.row.url" fit="fit"></el-image>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">
          <span class="name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单价" width="180">
        <template slot-scope="scope">
          <span  class="price">{{ scope.row.price }} 元</span>
        </template>
      </el-table-column>

      <el-table-column label="总价" width="180" class="price">
        <template slot-scope="scope">
          <span  class="price">{{ scope.row.price*scope.row.number }} 元</span>
        </template>
      </el-table-column>

      <el-table-column label="数量" width="240">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.number" @change="handleChange" :min="1" :max="100" label="购买数量"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle
            @click="removeGoodsById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-button class="button" type="danger" round>删除</el-button>
      <el-button class="button" type="success" round>结算</el-button>
    </el-row>
  </div></el-card>
</template>

<script>
export default {
  data () {
    return {
      goodsForm: [
        {
          id: '101',
          name: '华子',
          number: 1,
          price: 58,
          url: 'https://img.pszxw.com/pszxwimg/2020/09/2513330478488.jpg'
        },
        {
          id: '110',
          name: '花生',
          number: 1,
          price: 4.5,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          id: '111',
          name: '瓜子',
          number: 10,
          price: 2.5,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          id: '911',
          name: '八宝粥',
          number: 100,
          price: 5,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      ]
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取购物车中的数据
    async getGoodsList () {
      const { data: res } = await this.$axios.get('carts', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取购物车列表失败！')
      }
      this.userlist = res.data.users
      this.total = res.data.total
    },

    // 根据id删除对应的商品
    async removeGoodsById (id) {
      console.log(id)
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

      const { data: res } = await this.$axios.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getUserList()
    },

    handleChange (res) {
      console.log(res)
    },
    handleSelectionChange (res) {
      console.log(res)
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
