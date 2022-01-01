<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="30">
        <el-col :span="13">
          <el-input placeholder="输入商家名以查询" v-model="search">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click='getBusinessList'
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="businessList" height="250" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="商店" prop="shopname"></el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 删除用户按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="取消商家资格"
              placement="top-start"
              :enterable="false"
            >
              <el-button
                class="deletebut"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeUserByAccount(scope.row.account)"
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
      businessList: [
      ],
      totol: ''
    };
  },
  mounted () {
    this.getBusinessList();
  },
  methods: {
    // 获取用户列表
    getBusinessList () {
      try {
        this.$axios.post('/admin/businesslist', '"' + this.search.toString() + '"')
          .then(res => {
            if (res.status === 200) {
              console.log(res.status)
              this.businessList = res.data.data
              console.log(res.data)
            } else {
              return this.$message.error('商家获取失败')
            }
          })
      } catch (cerror) {
        console.log(cerror)
      }
    },
    /* 根据account取消商家资格 */
    // 不用async会返回一个promise对象
    async removeUserByAccount (account) {
      // 询问是否进行此操作
      console.log(account)
      const res = await this.$confirm(
        '此操作将永久取消商家资格, 是否继续?',
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
        this.$axios.post('admin/cancelbusiness', '"' + account.toString() + '"')
          .then(result => {
            console.log(result.data)
            if (result.data.status === 200) {
              this.$message.success('删除成功')
              this.getBusinessList()
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
