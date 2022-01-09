import request from '@/utils/request'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: '/edu/course/save-course-info',
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfoById(id) {
    return request({
      url: `/edu/course/course-info/${id}`,
      method: 'get'
    })
  },
  updateCourseInfoById(courseInfo) {
    return request({
      url: '/edu/course/update-course-info',
      method: 'put',
      data: courseInfo
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `/edu/course/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  }
}
