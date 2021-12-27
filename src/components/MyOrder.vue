<template>
  <el-table :data="orderForm" style="width: 100%">

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

    <el-table-column label="商品价格" width="180">
      <template slot-scope="scope">
        <span class="price">{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template  slot-scope="scope">
        <el-button size="mini" @click="addReview(scope.row.id)">评论</el-button>
        <el-button size="mini" type="primary" @click="checkTransport(scope.row.id)">物流</el-button>
        <el-button size="mini" @click="deleteOrder(scope.row.id)" type="danger">退货</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      orderForm: [
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
      transportDialogVisible: false
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    addReview (id) {
      console.log(id)
    },
    checkTransport (id) {
      console.log(id)
    },
    deleteOrder (res) {
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
