<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-button type="primary" @click="createDialogVisible = true">新建</el-button>
        <el-dialog title="新建用户" :visible.sync="createDialogVisible" width="50%">
          <create-form :visible="createDialogVisible" @finish="handleCreateFinish" />
        </el-dialog>
      </el-header>
      <el-main>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row>
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="account" label="账号" width="240" />
          <el-table-column prop="nickname" label="昵称" width="240" />
          <el-table-column prop="last_login_at" label="最后登陆时间" />
          <el-table-column prop="last_login_ip" label="最后登陆地址" />
          <el-table-column prop="created_at" label="创建时间" />
          <el-table-column prop="updated_at" label="修改时间" />
        </el-table>
      </el-main>
      <el-footer>
        <el-row type="flex" class="row-bg" justify="end">
          <el-pagination
            background
            :current-page.sync="pageNo"
            :page-sizes="[10, 15, 20, 100]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { getList } from '@/api/user'
import { formatTime } from '@/utils/index'
import createForm from './create'

export default {
  components: { createForm },
  data() {
    return {
      list: null,
      listLoading: true,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      createDialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(response => {
        const data = response.data
        const list = data.list
        for (let i = 0; i < list.length; i++) {
          list[i].last_login_at = list[i].last_login_at ? formatTime(Date.parse(list[i].last_login_at)) : '无'
          list[i].created_at = list[i].created_at ? formatTime(Date.parse(list[i].created_at)) : '无'
          list[i].updated_at = list[i].updated_at ? formatTime(Date.parse(list[i].updated_at)) : '无'
        }
        this.list = list
        this.total = data.pageinfo.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      this.fetchData()
    },
    handleCreateFinish(val) {
      if (val) {
        console.log('created, fetchData')
        this.fetchData()
      }
      this.createDialogVisible = false
    }
  }
}
</script>
