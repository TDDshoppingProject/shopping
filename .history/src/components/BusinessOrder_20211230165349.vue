<template>
  <el-table :data="orderList" style="width: 100%">
    <el-table-column
      label="图片"
      prop="goods.img"
      width="200px"
    ></el-table-column>
    <el-table-column
      label="商品"
      prop="goods.name"
      width="220px"
    ></el-table-column>
    <el-table-column label="数量" width="80px">
      <template slot-scope="scope">
        <span> &nbsp;&nbsp;&nbsp;×{{ scope.row.number }} </span>
      </template>
    </el-table-column>
    <el-table-column label="单价" width="80px">
      <template slot-scope="scope">
        <span> ¥{{ scope.row.goods.price }} </span>
      </template>
    </el-table-column>
    <el-table-column label="实付款" width="80px">
      <template slot-scope="scope">
        <span> ¥{{ scope.row.total }} </span>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="120px">
      <template slot-scope="scope">
       <span v-if="scope.row.status === 1">商品还未发货</span>
      <span v-if="scope.row.status === 2">商品正在路上</span>
        <span v-if="scope.row.status === 3">商品已签收</span>
      </template>
    </el-table-column>
    <el-table-column width="150px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          v-if="scope.row.status === 2"
          @click="confirmReceipt(scope.row.id)"
          >确认收货</el-button
        >
        <el-button
          size="mini"
          type="danger"
          v-if="scope.row.status === 3"
          @click="appraise(scope.row.goods.id, scope.row.id)"
          >评价</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      number: 'hhh',
      orderList: [],
      transportDialogVisible: false,
      // 订单总价
      totlePriceList: [],
      // 物流状态
      Logistics: '',
      text: ''
    };
  },
  mounted () {
    this.getOrder();
  },
  methods: {
    // 获取订单列表
    getOrder () {
      console.log(window.sessionStorage.getItem('role'))
      this.$axios
        .post('/business/' + window.sessionStorage.getItem('userid') + '/orderlist')
        .then((res) => {
          // 获取成功s
          if (res.status === 200) {
            this.orderList = res.data.data;
            console.log(res.data.data);
            console.log(this.ordersList);
          } else {
            this.$message.error('订单获取失败');
          }
        });
    },
    // 查看物流状态
    viewLogistics (status) {
      if (status === 1) {
        this.Logistics = '您的订单还未发货'
      }
    },
    // 确认收货
    confirmReceipt (id) {
      console.log(id)
      console.log(typeof (id))
      this.$axios.post('/setorderstatus/' + id)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$message.success('收货成功')
            this.getOrder();
          }
        })
    },
    // 评价
    async appraise (id, rid) {
      const res = await this.$prompt('请输入评论内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: value
        });
        this.text = value
      }).catch((err) => err)
      console.log(res)
      if (res !== 'cancel') {
        console.log(this.text)
        console.log(id)
        this.$axios.post('/addreview/' + id + '/' + window.sessionStorage.getItem('userid'), this.text)
          .then(result => {
            console.log(result)
            if (result.status === 200) {
              console.log('评论成功')
              this.$axios.post('/deleteorder/' + rid)
                .then(rs => {
                  if (rs.status === 200) {
                    this.getOrder();
                  }
                })
            }
          })
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
