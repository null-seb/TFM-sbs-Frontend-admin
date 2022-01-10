import request from '@/utils/request'

export default {

  getNestedTreeList(courseId) {
    return request({
      url: `/edu/chapter/nested-list/${courseId}`,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      url: `/edu/chapter/remove/${id}`,
      method: 'delete'
    })
  },

  save(chapter) {
    return request({
      url: '/edu/chapter/save',
      method: 'post',
      data: chapter
    })
  },

  getById(id) {
    return request({
      url: `/edu/chapter/get/${id}`,
      method: 'get'
    })
  },

  updateById(chapter) {
    return request({
      url: '/edu/chapter/update',
      method: 'put',
      data: chapter
    })
  }
}
