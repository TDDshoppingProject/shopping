<template>
  <el-card>
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
        <span v-if="scope.row.status === 3">商品已被用户签收</span>
      </template>
    </el-table-column>
    <el-table-column width="150px">
      <template slot-scope="scope">
          <el-button
          size="mini"
          v-if="scope.row.status === 1"
          @click="startReceipt(scope.row.id)"
          >点击发货</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  </el-card>
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
    // 点击发货
    startReceipt (id) {
      console.log('oid:' + id)
      console.log(typeof (id))
      this.$axios.post('/business/setorderstatus/' + id)
        .then(res => {
          console.log('哈哈哈' + res)
          console.log(res.status)
          if (res.status === 200) {
            this.$message.success('发货成功')
            this.getOrder();
          }
        })
    }
  }
};
</script>

<style lang="less" scoped></style>
