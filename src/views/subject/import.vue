<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Information">
        <el-tag type="info">excel</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="defaultExcelTemplate">Click to download template</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="Choose Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-exceed="fileUploadExceed"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :limit="1"
          action="http://127.0.0.1:8110/edu/subject/import"
          name="file"
          accept="application/msexcel"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >Choose file</el-button>
          <el-button
            :disabled="importBtnDisabled"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload()"
          >import</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultExcelTemplate: 'https://sbs-file.oss-cn-qingdao.aliyuncs.com' + '/excel/课程分类列表.xlsx', // 默认Excel模板
      importBtnDisabled: false // 导入按钮是否禁用
    }
  },
  methods: {
    // 上传多于一个视频时
    fileUploadExceed() {
      this.$message.warning('Only one file can be selected')
    },

    // 上传
    submitUpload() {
      this.importBtnDisabled = true
      this.$refs.upload.submit() // 提交上传请求
    },

    // 上传成功的回调
    fileUploadSuccess(response) {
      if (response.success) {
        this.importBtnDisabled = false // 启用按钮
        this.$message.success(response.message)
        this.$refs.upload.clearFiles() // 清空文件列表
      } else {
        this.$message.error('Upload failed! （非20000）')
      }
    },

    // 上传失败的回调
    fileUploadError() {
      this.importBtnDisabled = false // 启用按钮
      this.$message.error('Upload failed! （http失败）')
      this.$refs.upload.clearFiles() // 清空文件列表
    }
  }
}
</script>

<style scoped>

</style>
