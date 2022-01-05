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
      <el-form-item label="学校头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          action="http://localhost:8120/oss/file/upload?module=avatar"
        >
          <img v-if="college.avatar" :src="college.avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

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
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {

    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      if (!this.college.id) {
        this.saveData()
      } else {
        this.updateData()
      }
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
    },

    // 根据id查询记录
    fetchDataById(id) {
      collegeApi.getById(id).then(response => {
        this.college = response.data.item
      })
    },

    updateData() {
      // college数据的获取
      collegeApi.updateById(this.college).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/college' })
      })
    },

    // 上传成功回调
    handleAvatarSuccess(res) {
      console.log(res)
      if (res.success) {
        // console.log(res)
        this.college.avatar = res.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('Upload failed （!20000）')
      }
    },

    // 错误处理
    handleAvatarError() {
      console.log('error')
      this.$message.error('Upload failed（http failed）')
    },

    // 上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('The uploaded photos can only be in jpg format!')
      }
      if (!isLt2M) {
        this.$message.error('Upload avatar image size cannot exceed 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
