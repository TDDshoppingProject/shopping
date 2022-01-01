<template>
  <el-card>
     <el-table :data="orderList" >
    <el-table-column
      label="图片"
      width="150px"
    >
     <template slot-scope="scope">
       <img :src="scope.row.goods.img" style="height: 100px">
      </template></el-table-column>
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
    <el-table-column
      label="店铺"
      prop="shop.name"
      width="100px"
    ></el-table-column>
    <el-table-column label="订单状态" width="120px">
      <template slot-scope="scope">
       <span v-if="scope.row.status === 1">商品还未发货</span>
      <span v-if="scope.row.status === 2">商品正在路上</span>
        <span v-if="scope.row.status === 3">商品已签收</span>
      </template>
    </el-table-column>
    <el-table-column >
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
        .post('/' + window.sessionStorage.getItem('userid') + '/orderlist')
        .then((res) => {
          // 获取成功s
          if (res.status === 200) {
            this.orderList = res.data.data;
            console.log(res.data.data);
            console.log(this.ordersList);
            const a = this.orderList;
            // eslint-disable-next-line no-var
            var p = 0;
            for (const key in a) {
              /* console.log(a[key]) */
              for (const i in a[key]) {
                // 商品数量
                if (i === 'number') {
                  console.log('number:' + a[key][i]);
                  // eslint-disable-next-line no-var
                  var n = a[key][i];
                }
                // 商品对应的商店
                if (i === 'shop') {
                  for (const c in a[key][i]) {
                    if (c === 'name') {
                      console.log('name:' + a[key][i][c]);
                    }
                  }
                }
                // 商品对应的价格
                if (i === 'goods') {
                  for (const b in a[key][i]) {
                    if (b === 'price') {
                      console.log('price:' + a[key][i][b]);
                      console.log(p + 'totle:' + n * a[key][i][b]);
                      this.totlePriceList[p] = n * a[key][i][b];
                      console.log('listPrice' + this.totlePriceList[p]);
                      p = p + 1;
                    }
                  }
                }
              }
            }
            console.log(this.totlePriceList);
          } else {
            this.$message.error('订单获取失败');
          }
        });
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
