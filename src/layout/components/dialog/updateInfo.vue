<template>
  <el-container>
    <el-form ref="form" v-loading="isLoading" :model="form" label-width="80px" style="width: 100%;">
      <el-form-item label="账号">
        <el-input v-model="form.account" placeholder="请输入账号" disabled />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item v-show="changePassword" label="旧密码">
        <el-input v-model="form.oldPassword" placeholder="请输入旧密码以修改密码" show-password />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.password" placeholder="留空则不修改" show-password />
      </el-form-item>
      <el-form-item v-show="changePassword" label="确认密码">
        <el-input v-model="form.rePassword" placeholder="请再次输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="float: right;" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>

import { getInfo, updateInfo } from '@/api/auth'

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
        name: '',
        account: '',
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      isLoading: true // default is loading, until data loaded
    }
  },
  computed: {
    changePassword() {
      return this.form.password !== ''
    }
  },
  watch: {
    visible(newValue) {
      if (newValue === true) {
        console.log('parent component open, fetch form data')
        this.fetchData()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isLoading = true
      getInfo().then(response => {
        this.form.name = response.data.name
        this.form.account = response.data.account
        this.form.oldPassword = ''
        this.form.password = ''
        this.form.rePassword = ''
        this.isLoading = false
      })
    },
    onSubmit() {
      this.isLoading = true
      updateInfo({
        name: this.form.name,
        old_password: this.form.oldPassword,
        password: this.form.password
      }).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.fetchData()
        this.$store.dispatch('auth/getInfo')
        this.$emit('finish')
      }).catch(err => {
        console.log('err' + err)
        this.isLoading = false
      })
    }
  }
}
</script>
