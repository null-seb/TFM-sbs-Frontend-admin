<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="college" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="ranking">
          <el-option value="2" label="Top50" />
          <el-option value="1" label="Top500" />
        </el-select>
      </el-form-item>

      <el-form-item label="joinDate">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="begin"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="end"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">search</el-button>
        <el-button type="default" @click="resetData()">empty</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border stripe>
      <el-table-column
        label="#"
        width="50"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
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
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>

<script>
import collegeApi from '@/api/college'
export default {
  // 定义数据模型
  data() {
    return {
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}// 查询条件
    }
  },

  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },

  // 定义方法
  methods: {
    // 调用api
    fetchData() {
      collegeApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },
    // 改变页码，page：回调参数，表示当前选中的“页码”
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },
    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
