<template>
  <div class="app-container">

    <!-- 添加章节按钮 -->
    <div>
      <el-button type="primary" @click="addChapter()">Create chapter</el-button>
    </div>

    <!-- 章节列表 -->
    <ul class="chapterList">
      <li
        v-for="chapter in chapterList"
        :key="chapter.id"
      >
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text">Create Lesson</el-button>
            <el-button type="text" @click="editChapter(chapter.id)">Edit</el-button>
            <el-button type="text" @click="removeChapterById(chapter.id)">Delete</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id"
          >
            <p>
              {{ video.title }}
              <el-tag v-if="!video.videoSourceId" size="mini" type="danger">
                {{ '尚未上传视频' }}
              </el-tag>
              <span class="acts">
                <el-tag v-if="video.free" size="mini" type="success">{{ '免费观看' }}</el-tag>
                <el-button type="text">Edit</el-button>
                <el-button type="text">Delete</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <chapter-form ref="chapterForm" />
    <!-- 课时表单对话框 TODO -->

    <div style="text-align:center">
      <el-button type="primary" @click="prev()">Previous</el-button>
      <el-button type="primary" @click="next()">Next</el-button>
    </div>
  </div>
</template>

<script>
import chapterApi from '@/api/chapter'
import ChapterForm from '@/views/course/components/Chapter/Form'

export default {

  components: { ChapterForm },
  data() {
    return {
      chapterList: [] // 章节嵌套列表
    }
  },

  created() {
    this.fetchNodeList()
  },

  methods: {

    // 获取远程数据
    fetchNodeList() {
      chapterApi.getNestedTreeList(this.$parent.courseId).then(response => {
        this.chapterList = response.data.items
      })
    },

    addChapter() {
      this.$refs.chapterForm.open()
    },

    editChapter(chapterId) {
      this.$refs.chapterForm.open(chapterId)
    },

    removeChapterById(chapterId) {
      this.$confirm('This action will permanently delete the section, do you continue?', 'Tips', {
        confirmButtonText: 'Config',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        return chapterApi.removeById(chapterId)
      }).then(response => {
        this.fetchNodeList()
        this.$message.success(response.message)
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message.info('Cancel')
        }
      })
    },

    // 上一步
    prev() {
      this.$parent.active = 0
    },

    // 下一步
    next() {
      this.$parent.active = 2
    }
  }
}
</script>

<style>
.chapterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #DDD;
}
</style>
