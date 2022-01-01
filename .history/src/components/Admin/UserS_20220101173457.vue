<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="30">
        <el-col :span="13">
          <el-input placeholder="输入用户名以查询" v-model="search">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" height="250" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 删除用户按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除用户"
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
      userList: [
      ],
      totol: ''
    };
  },
  mounted () {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList () {
      this.$axios.post('admin/userlist', '"' + this.search.toString() + '"')
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            console.log(res.status)
            this.userList = res.data.data
            console.log(res.data)
          } else {
            return this.$message.error('用户列表获取失败')
          }
        })
    },
    /* 根据account删除用户 */
    // 不用async会返回一个promise对象
    async removeUserByAccount (account) {
      // 询问是否进行此操作
      console.log(account)
      const res = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
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
        this.$axios.post('admin/deleteuser', '"' + account.toString() + '"')
          .then(result => {
            console.log(result.data)
            if (result.data.status === 200) {
              this.getUserList()
              this.$message.success('删除成功')
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
.el-table {
  margin-top: 15px;
  font-size: 12px;
  height: 425px !important;
}
</style>
