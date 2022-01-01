<template>
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
        <el-button type="primary" @click="register">注册</el-button>
        <el-button type="info" @click="resetLoginForm ">重置</el-button>
      </el-form-item>
    </el-form>
</template>
<script>
export default {
  data () {
    const isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码');
      } else {
        const reg =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); // 转换为数字
        if (typeof value === 'number' && !isNaN(value)) {
          // 判断是否为数字
          value = value.toString(); // 转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) {
            // 判断是否为11位手机号
            callback(new Error('请输入正确的手机号'));
          } else {
            callback(new Error('号码不能为空'));
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
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
  left: 75%;
  transform: translate(-75%, 0);
}
</style>
