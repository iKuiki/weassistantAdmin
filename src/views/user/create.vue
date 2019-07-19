<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.account" placeholder="请输入账号" style="width:90%" />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="form.nickname" placeholder="请输入昵称" style="width:90%" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" placeholder="请输入密码" show-password style="width:90%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { create } from '@/api/user'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        account: '',
        nickname: '',
        password: ''
      }
    }
  },
  watch: {
    visible: function(newValue) {
      if (newValue === false) {
        console.log('parent component close, reset create user form')
        this.resetForm()
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        account: '',
        nickname: '',
        password: ''
      }
    },
    onSubmit() {
      console.log('submit!')
      create(this.form).then(response => {
        const data = response.data
        this.$message({
          message: '创建用户' + data.account + '成功',
          type: 'success'
        })
        this.resetForm()
        this.$emit('finish', true)
      }).catch(err => {
        console.log('err' + err)
      })
    },
    onCancel() {
      this.resetForm()
      this.$emit('finish', false)
    }
  }
}
</script>
