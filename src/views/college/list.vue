<template>
  <div class="app-container">
    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="Name" width="80" />
      <el-table-column label="ranking" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="success" size="mini">Top500</el-tag>
          <el-tag v-if="scope.row.level === 2" size="mini">Top50</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="Introduction" />
      <el-table-column prop="sort" label="Sort" width="60" />
      <el-table-column prop="joinDate" label="JoinDate" width="160" />
    </el-table>
  </div>
</template>

<script>
import collegeApi from '@/api/college'
export default {
  // 定义数据模型
  data() {
    return {
      list: []
    }
  },

  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },

  // 定义方法
  methods: {
    fetchData() {
      // 调用api
      collegeApi.list().then(response => {
        this.list = response.data.items
      })
    }
  }
}
</script>

<style scoped>

</style>
