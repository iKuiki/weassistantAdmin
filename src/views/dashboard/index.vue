<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="dashboard-text">欢迎回来，{{ name }}</span>
      </div>

      <br >
      <div class="dashboard-item">最后登陆时间:{{ lastLoginTime }}</div>
      <br >
      <div class="dashboard-item">最后登陆IP:{{ lastLoginIP }}</div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from '@/utils/index'

export default {
  name: 'Dashboard',
  computed: {
    lastLoginTime() {
      return this.lastLoginAt ? formatTime(Date.parse(this.lastLoginAt)) : '无'
    },
    ...mapGetters([
      'name',
      'lastLoginAt',
      'lastLoginIP'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-item {
    margin-bottom: 14px;
  }
}
</style>
