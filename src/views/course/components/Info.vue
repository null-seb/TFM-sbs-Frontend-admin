<template>
  <div class="app-container">

    <!-- 课程信息表单 -->
    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.collegeId"
          placeholder="请选择"
        >
          <el-option
            v-for="college in collegeList"
            :key="college.id"
            :label="college.name"
            :value="college.id"
          />
        </el-select>
      </el-form-item>

      <!-- 所属分类 TODO -->

      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="0" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介 TODO -->

      <!-- 课程封面 TODO -->

      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right" placeholder="免费课程请设置为0元" /> 元
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveAndNext()">保存并下一步</el-button>
    </div>
  </div>
</template>

<script>
import courseApi from '@/api/course'
import collegeApi from '@/api/college'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 按钮是否禁用
      courseInfo: { // 表单数据
        price: 0,
        lessonNum: 0,
        // 以下解决表单数据不全时insert语句非空校验
        collegeId: '',
        subjectId: '',
        subjectParentId: '',
        cover: '',
        description: ''
      },
      collegeList: []
    }
  },

  created() {
    this.initTeacherList()
  },

  methods: {
    // 保存并下一步
    saveAndNext() {
      this.saveBtnDisabled = true
      this.saveData()
    },

    // 保存
    saveData() {
      courseApi.saveCourseInfo(this.courseInfo).then(response => {
        this.$message.success(response.message)
        this.$parent.courseId = response.data.courseId // 获取courseId
        this.$parent.active = 1// 下一步
      })
    },

    initTeacherList() {
      collegeApi.list().then(response => {
        this.collegeList = response.data.items
      })
    }
  }
}
</script>
