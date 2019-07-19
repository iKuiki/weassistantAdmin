<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="last_login_at" label="最后登陆时间" />
      <el-table-column prop="last_login_ip" label="最后登陆地址" />
      <el-table-column prop="created_at" label="创建时间" />
      <el-table-column prop="updated_at" label="修改时间" />
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/user'
import { formatTime } from '@/utils/index'
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({
        pageSize: 10,
        pageNo: 2
      }).then(response => {
        const list = response.data
        for (let i = 0; i < list.length; i++) {
          list[i].last_login_at = list[i].last_login_at ? formatTime(Date.parse(list[i].last_login_at)) : '无'
          list[i].created_at = list[i].created_at ? formatTime(Date.parse(list[i].created_at)) : '无'
          list[i].updated_at = list[i].updated_at ? formatTime(Date.parse(list[i].updated_at)) : '无'
        }
        this.list = list
        this.listLoading = false
      })
    }
  }
}
</script>
