<template>
    <div class="loginContainer">
        <div class="loginBox">
            <div class="avatarBox">
                <img src="../assets/avatar.png">
            </div>
            <p class="fr">Register</p>
            <p class="toLogin">
                <router-link to="/login">已有账号？马上登录</router-link>
            </p>
            <el-form ref="registerFormRef" class="registerForm" :rules="registerFormRules" :model="registerForm">
                <el-form-item prop="account">
                    <el-input v-model="registerForm.account" prefix-icon="iconfont icon-avatar" placeholder="请输入用户名"></el-input>
               </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" type="password" prefix-icon="iconfont icon-mima-1" placeholder="请输入密码"></el-input>
               </el-form-item>
               <el-form-item prop="rePassword">
                    <el-input v-model="registerForm.rePassword" type="Password" prefix-icon="iconfont icon-mima-1" placeholder="请确认密码"></el-input>
               </el-form-item>
               <el-form-item class="btns">
                    <el-button type="primary" @click="register">注册</el-button>
                    <el-button type="info" @click="resetLoginForm ">重置</el-button>
               </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
export default {
  data () {
    return {
      // 表单数据绑定
      registerForm: {
        account: '',
        password: '',
        rePassword: ''
      },
      // 表单验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        account: [
          {
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.registerFormRef.resetFields()
    },
    register () {
      if (this.registerForm.password !== this.registerForm.rePassword) {
        this.$message.error('两次输入的密码不一样')
        return false
      }
      // 向后端发送注册请求，若状态码200,则注册成功
      this.$axios.post('/register', this.registerForm)
        .then(res => {
          console.log(res.data.status)
          console.log('-----------------------')
          console.log(res)
          if (res.data.status === 400) {
            this.$message.warning('用户已存在')
          }
          if (res.data.status === 201) {
            console.log(res.data.status)
            this.$message.success(' 注册成功')
            // 3s后自动跳转到登陆页面
            setTimeout(() => {
              this.$router.push('login')
            }, 3000)
          }
        })
    }
  }

}
</script>
<style lang="less" scoped>
.loginContainer{
    background-color:#EC9454 ;
    height:100%;

}
.fr{
  font-size: 30px;
  font-weight: bold;
  position: absolute;
  left:50%;
  top:50px;
  transform: translate(-50%,0);
}
.toLogin{
  font-size: 15px ;
  position: absolute;
  left:50%;
  bottom:10px;
  transform: translate(-50%,0);
}
a{
  text-decoration: none;
  color:#EC9454;
}
.router-link-active {
  text-decoration: none;
  }
.loginBox{
    width:300px;
    height:450px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%) ;
    background-color: aliceblue;
    border-radius: 5px;
    box-shadow:0 0 10px #4d4a4a;
    .avatarBox{
        width:100px;
        height:100px;
        border:1px soild #A6A6A6;
        border-radius: 50%;
        padding:5px;
        box-shadow: 0 0 2px #A6A6A6;
        position:absolute;
        left:50%;
        transform: translate(-50%,-50%);
        background-color:white ;
        img{
            width:100%;
            height:100%;
            border-radius: 50%;
            background-color: #A6A6A6;
        }

    }
}
.btns{
    display:flex;
    justify-content : space-around;

}
.registerForm{
    width:100%;
    padding:0px 20px;
    box-sizing: border-box;
    position:absolute;
    top:150px;
}
</style>
