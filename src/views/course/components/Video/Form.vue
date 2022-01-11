<template>
  <!-- 添加和修改课时表单 -->
  <el-dialog :visible="dialogVisible" title="Adding lesson" @close="close()">
    <el-form :model="video" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="video.title" />
      </el-form-item>
      <el-form-item label="Sort">
        <el-input-number v-model="video.sort" :min="0" />
      </el-form-item>
      <el-form-item label="Free or not">
        <el-radio-group v-model="video.free">
          <el-radio :label="true">Free</el-radio>
          <el-radio :label="false">Default</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 上传视频 -->
      <el-form-item label="Video upload">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :on-exceed="handleUploadExceed"
          :file-list="fileList"
          :limit="1"
          action="http://127.0.0.1:8130/vod/media/upload"
        >
          <el-button slot="trigger" size="small" type="primary">Choose video</el-button>
          <el-button
            :disabled="uploadBtnDisabled"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload()"
          >上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">Cancel</el-button>
      <el-button type="primary" @click="saveOrUpdate()">Config</el-button>
    </div>
  </el-dialog>
</template>

<script>
import videoApi from '@/api/video'
export default {

  data() {
    return {
      dialogVisible: false,
      video: {
        sort: 0,
        free: false
      },
      fileList: [], // 上传文件列表
      uploadBtnDisabled: false
    }
  },

  methods: {
    open(chapterId, videoId) {
      this.dialogVisible = true
      this.video.chapterId = chapterId
      if (videoId) {
        videoApi.getById(videoId).then(response => {
          this.video = response.data.item
          // 回显
          if (this.video.videoOriginalName) {
            this.fileList = [{ 'name': this.video.videoOriginalName }]
          }
        })
      }
    },

    close() {
      this.dialogVisible = false
      // 重置表单
      this.resetForm()
    },

    resetForm() {
      this.video = {
        sort: 0,
        free: false
      }
      this.fileList = [] // 重置视频上传列表
    },

    saveOrUpdate() {
      if (!this.video.id) {
        this.save()
      } else {
        this.update()
      }
    },

    save() {
      this.video.courseId = this.$parent.$parent.courseId
      videoApi.save(this.video).then(response => {
        this.$message.success(response.message)
        // 关闭组件
        this.close()
        // 刷新列表
        this.$parent.fetchNodeList()
      })
    },

    update() {
      videoApi.updateById(this.video).then(response => {
        this.$message.success(response.message)
        // 关闭组件
        this.close()
        // 刷新列表
        this.$parent.fetchNodeList()
      })
    },
    handleUploadExceed(files, fileList) {
      this.$message.warning('If you want to re-upload the video, please delete the uploaded video first')
    },
    // 上传
    submitUpload() {
      this.uploadBtnDisabled = true
      this.$refs.upload.submit() // 提交上传请求
    },
    // 视频上传成功的回调
    handleUploadSuccess(response, file, fileList) {
      this.uploadBtnDisabled = false
      if (response.success) {
        this.video.videoSourceId = response.data.videoId
        this.video.videoOriginalName = file.name
      } else {
        this.$message.error('UploadFailed1')
      }
    },

    // 失败回调
    handleUploadError() {
      this.uploadBtnDisabled = false
      this.$message.error('UploadFailed2')
    }
  }
}
</script>
