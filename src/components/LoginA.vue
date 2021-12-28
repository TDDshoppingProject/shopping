<template>
    <div class="loginContainer">
        <div class="loginBox">
            <div class="avatarBox">
                <img src="../assets/avatar.png">
            </div>
            <p>Login</p>
            <el-form ref="loginFormRef" class="loginForm" :rules="loginFormRules" :model="loginForm">
                <el-form-item prop="account">
                    <el-input v-model="loginForm.account" prefix-icon="iconfont icon-avatar" placeholder="请输入用户名"></el-input>
               </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-mima-1" placeholder="请输入密码"></el-input>
               </el-form-item>
               <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="success" @click="toRegister ">注册</el-button>
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
      loginForm: {
        account: '',
        password: ''
      },
      // 表单验证规则对象
      loginFormRules: {
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
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (valid) {
          const { data: res } = await this.$axios.post('/login', this.loginForm)
          console.log('-----------------------')
          console.log(res)
          if (res.status !== 200) {
            return this.$message.error('登录失败')
          } else {
            this.$message.success('登录成功')
            console.log(res.message)
            // 管理员进入后台管理系统
            if (res.message === 'admin') {
              /* 存放用户的id */
              window.sessionStorage.setItem('userid', res.data.master.id)
              this.$router.push('/admin')
            }
            // 普通用户进入个人页面
            if (res.message === 'user') {
              /* 存放用户的id */
              window.sessionStorage.setItem('userid', res.data.user.id)
              this.$router.push('/homepage')
            }
            /* 1.将登录成功之后的token, 保存到客户端的sessionStorage中
           1.1.项目中出了登录之外的其他API接口, 必须在登录之后才能访问
           1.2.token只应在当前网站打开期间生效, 所以将token保存到sessionStorage中 */
            window.sessionStorage.setItem('token', res.data.token)
          }
        } else {
          return false
        }
      })
    },
    // 点击跳转到注册按钮，push方法可以返回上个页面
    toRegister () {
      this.$router.push('register')
    }
  }

}
</script>
<style lang="less" scoped>
.loginContainer{
    background-color:#EC9454 ;
    height:100%;
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
p{
  font-size: 30px;
  font-weight: bold;
  position: absolute;
  left:50%;
  top:50px;
  transform: translate(-50%,0);
}
.btns{
    margin:50px 20px;
    display:flex;
    justify-content : space-around;

}
.loginForm{
    width:100%;
    padding:0px 20px 20px 20px;
    box-sizing: border-box;
    position:absolute;
    top:190px;
}
</style>
