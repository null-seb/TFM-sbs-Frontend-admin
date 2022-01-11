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
      }
    }
  },

  methods: {
    open(chapterId, videoId) {
      this.dialogVisible = true
      this.video.chapterId = chapterId
      if (videoId) {
        videoApi.getById(videoId).then(response => {
          this.video = response.data.item
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
    }
  }
}
</script>
