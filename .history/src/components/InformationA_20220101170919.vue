<template>
<el-card>
  <div>
    <!-- 面包屑导航区域（伪） -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/information' }">个人资料</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cart' }">购物车</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order' }">我的订单</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/store' }">我的店铺</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 调节大小 -->
    <el-radio-group v-model="size" style="margin-top: 20px">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
    </el-radio-group>
    <!-- 个人资料框 -->
    <el-descriptions style="margin-top: 15px" title="我的资料" :column="1" :size="size" border :data="userForm">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          账号
        </template>
        {{userForm.account}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{userForm.name}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-female"></i>
          性别
        </template>
        {{userForm.sex}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date"></i>
          年龄
        </template>
        {{userForm.age}}岁
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile"></i>
          手机号
        </template>
        {{userForm.mobile}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          邮箱
        </template>
        {{userForm.email}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          地址
        </template>
        {{userForm.address}}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 修改资料按钮 -->
    <el-row>
      <el-col :span="4">
        <el-button style="margin-top: 15px" type="primary" @click="alterDialogVisible = true">修改资料</el-button>
      </el-col>
    </el-row>

    <!-- 修改用户资料对话框 -->
    <el-dialog  title="修改个人资料" :visible.sync="alterDialogVisible" >
      <!-- 内容主体区域 -->
      <el-form :model="alterForm" :rules="rules" ref="alterForm" label-width="100px" style="width: 400px">
        <!-- 修改姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="alterForm.name"></el-input>
        </el-form-item>
        <!-- 修改性别 -->
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="alterForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 修改年龄 -->
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="alterForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 修改手机号 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.number="alterForm.mobile"></el-input>
        </el-form-item>
        <!-- 修改邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="alterForm.email"></el-input>
        </el-form-item>
        <!-- 修改地址 -->
        <el-form-item label="地址" prop="address">
          <el-input v-model="alterForm.address"></el-input>
        </el-form-item>
        <!-- 修改密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="alterForm.password"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</el-card>
</template>

<script>
export default {
  data () {
    // 验证邮箱的规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
      // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    // 验证密码的规则
    const checkPassword = (rule, value, cb) => {
      // 验证密码的正则表达式
      const regPassword = /^(\w){6,15}$/
      if (regPassword.test(value)) {
      // 合法的密码
        return cb()
      }
      cb(new Error('密码仅由6-15位数字、字母和下划线组成'))
    }

    return {
      // 获取用户信息
      userForm: [],
      // 用户
      username: '',
      // 更新用户信息
      alterForm:
      {
        name: '',
        sex: '',
        age: '',
        mobile: '',
        email: '',
        address: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 0, max: 15, message: '用户名不得超过15个字', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'number', message: '手机号必须为数字值', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不得为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      // 控制修改用户资料对话框的显示与隐藏
      alterDialogVisible: false,
      // 调整个人用户页面的大小
      size: ''
    }
  },
  mounted () {
    this.getUserInformatin()
  },
  methods: {
    // 获取用户信息
    getUserInformatin () {
      this.$axios.post('/getinfor/' + window.sessionStorage.getItem('userid'))
        .then(res => {
          if (res.status === 200) {
            console.log(res)
            this.userForm = res.data.data
            this.username = res.data.data.name
            this.alterForm.sex = this.userForm.sex
            this.alterForm.age = this.userForm.age
            this.alterForm.mobile = this.userForm.mobile
            this.alterForm.email = this.userForm.email
            this.alterForm.address = this.userForm.address
            this.alterForm.password = this.userForm.password
          }
          this.alterDialogVisible = false
        })
    },
    // 更新用户信息
    updateUserInfo () {
      this.$axios.post('/setinfor/' + window.sessionStorage.getItem('userid') + '/' + this.alterForm.name + '/' + this.alterForm.sex + '/' + this.alterForm.age + '/' + this.alterForm.mobile + '/' + this.alterForm.email + '/' + this.alterForm.address + '/' + this.alterForm.password)
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            this.getUserInformatin()
            this.$message.success('修改成功')
          } else { this.$message.error('修改失败') }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 18px;
  line-height: 1cm;
}
</style>
