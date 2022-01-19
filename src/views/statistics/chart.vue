<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="Begin Date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="End Date"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()"
      >Search</el-button>
    </el-form>

    <el-row>
      <el-col :span="12">
        <div id="register_num" class="chart" style="height:500px;" />
      </el-col>
      <el-col :span="12">
        <div id="login_num" class="chart" style="height:500px;" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="video_view_num" class="chart" style="height:500px;" />
      </el-col>
      <el-col :span="12">
        <div id="course_num" class="chart" style="height:500px;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import statisticsApi from '@/api/statistics'

export default {
  data() {
    return {
      searchObj: {
        begin: '',
        end: ''
      },
      btnDisabled: false,
      chartData: {}
    }
  },

  methods: {

    showChart() {
      statisticsApi.showChart(this.searchObj).then(response => {
        this.chartData = response.data.chartData
        this.showChartByType('register_num', 'User register num', this.chartData.registerNum)
        this.showChartByType('login_num', 'User login num', this.chartData.loginNum)
        this.showChartByType('video_view_num', 'Course Play Count', this.chartData.videoViewNum)
        this.showChartByType('course_num', 'Daily Course Count', this.chartData.courseNum)
      })
    },

    showChartByType(type, title, data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(type))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: title
        },
        xAxis: {
          data: data.xData
        },
        yAxis: {},
        series: [{
          data: data.yData,
          type: 'line'
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
