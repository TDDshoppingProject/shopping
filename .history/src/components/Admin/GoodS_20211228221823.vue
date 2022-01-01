<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="30">
        <el-col :span="13">
          <el-input placeholder="请输入商品名以查询" v-model="search">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click='getGoodsList'
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="goodList" height="250" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="图片" prop="img"></el-table-column>
        <el-table-column label="商品名" prop="name"></el-table-column>
        <el-table-column label="商品介绍" prop="introduce"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="所属商店" prop="shopname"></el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 删除商品按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="下架商品"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                class="deletebut"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserByName(scope.row.name)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      goodList: [],
      totol: ''
    };
  },
  mounted () {
    this.getGoodsList();
  },
  methods: {
    // 获取用户列表
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
    /* 根据name删除商品 */
    // 不用async会返回一个promise对象
    async removeUserByName (name) {
      // 询问是否进行此操作
      console.log(name)
      const res = await this.$confirm(
        '此操作将永久下架商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err);
      console.log(res);
      // 取消操作返回cancel
      // 确认返回confirm
      if (res === 'cancel') {
        this.$message.error('取消删除操作');
      }
      if (res === 'confirm') {
        this.$axios.post('admin/deletegoods', '"' + name.toString() + '"')
          .then(result => {
            console.log(result.data)
            if (result.data.status === 200) {
              this.getGoodsList()
            } else {
              this.$message.error('删除失败')
            }
          })
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgb(179, 174, 174) !important;
}
.el-table{
  margin-top:15px;
  font-size: 12px;
  height: 425px !important;
}
</style>
