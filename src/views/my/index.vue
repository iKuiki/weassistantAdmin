<template>
  <div class="app-container">
    <el-container>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改个人信息</span>
          <el-button type="primary" style="float: right" @click="onSubmit">保存</el-button>
        </div>

        <el-form ref="form" v-loading="isLoading" :model="form" label-width="80px">
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
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>-->
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>

import { getInfo, updateInfo } from '@/api/auth'

export default {
  name: 'My',
  data() {
    return {
      form: {
        name: '',
        account: '',
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      isLoading: true
    }
  },
  computed: {
    changePassword() {
      return this.form.password !== ''
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
      }).catch(err => {
        console.log('err' + err)
        this.isLoading = false
      })
    }
  }
}
</script>
