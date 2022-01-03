<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="College Name">
        <el-input v-model="college.name" />
      </el-form-item>
      <el-form-item label="Join date">
        <el-date-picker v-model="college.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="College sort">
        <el-input-number v-model="college.sort" :min="0" />
      </el-form-item>
      <el-form-item label="College level">
        <el-select v-model="college.level">
          <!--
          数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="Top500" />
          <el-option :value="2" label="Top50" />
        </el-select>
      </el-form-item>
      <el-form-item label="intro">
        <el-input v-model="college.intro" />
      </el-form-item>
      <el-form-item label="career">
        <el-input v-model="college.career" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 学校头像 -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import collegeApi from '@/api/college'
export default {
  data() {
    return {
      // 初始化学校默认数据
      college: {
        sort: 0,
        level: 1
      },
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  },
  methods: {

    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      this.saveData()
    },

    // 新增学校
    saveData() {
      // debugger
      collegeApi.save(this.college).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/college' })
      })
    }
  }
}
</script>

<style scoped>

</style>
