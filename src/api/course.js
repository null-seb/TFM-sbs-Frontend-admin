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
  },
  removeById(id) {
    return request({
      url: `/edu/course/remove/${id}`,
      method: 'delete'
    })
  },
  getCoursePublishById(id) {
    return request({
      url: `/edu/course/course-publish/${id}`,
      method: 'get'
    })
  },

  publishCourseById(id) {
    return request({
      url: `/edu/course/publish-course/${id}`,
      method: 'put'
    })
  }
}
