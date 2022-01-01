<template>
<el-card>

<el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺名" prop="shopname">
        <el-input v-model="ruleForm.shopname"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="mobileNumber">
        <el-input v-model="ruleForm.mobileNumber"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="applyStore">注册</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
</template>
</el-card>
<script>
import ChildA from '@/components/PersonA'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ChildA
  },
  data () {
    const isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码');
      } else {
        const reg =
           /^((0\d{2,3}-?\d{7,8})|(1[3465789]\d{9}))$/;
        const isPhone = reg.test(value);
        value = Number(value); // 转换为数字
        if (typeof value === 'number' && !isNaN(value)) {
          // 判断是否为数字
          value = value.toString(); // 转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) {
            // 判断是否为11位手机号
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        } else {
          callback(new Error('请输入正确的手机号'));
        }
      }
    };

    return {
      ruleForm: {
        shopname: '',
        mobileNumber: ''
      },
      // 验证规则
      rules: {
        shopname: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobileNumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: isMobileNumber, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetLoginForm () {
      this.$refs.ruleForm.resetFields()
    },
    // 注册商店
    applyStore () {
      this.$axios.post('/becomebusiness/' + window.sessionStorage.getItem('userid') + '/' + this.ruleForm.shopname)
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            this.$message.success('注册成功')
            window.sessionStorage.setItem('role', res.data.data.user.business)
            // 调用子组件的方法，child是上边ref起的名字，emitEvent是子组件的方法
            this.$refs.child.judge();
          }
        })
    }
  }
};
</script>
<style lang="less"  scoped>
.el-input {
  width: 50% !important;
}
.el-form {
  width: 80%;
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
}
.btns{
  display:flex;
  position: absolute;
  left:10%;
}
</style>
